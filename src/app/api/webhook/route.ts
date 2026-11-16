import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";

// Initialize lazily to prevent build-time crashes
const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-01-27.acacia" as any,
});

const getResend = () => new Resend(process.env.RESEND_API_KEY || "re_fallback");

export async function POST(req: Request) {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
        console.error("Webhook Error: Secret keys missing");
        return NextResponse.json({ error: "Messaging or Stripe not configured" }, { status: 500 });
    }
    const stripe = getStripe();
    const resend = getResend();
    const body = await req.text();
    const sig = req.headers.get("stripe-signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
    } catch (err: any) {
        console.error(`Webhook Signature Error: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Processing completed session:", session.id);

        // Extract order details from metadata
        const metadata = session.metadata;
        if (metadata && metadata.order_details) {
            try {
                const rawData = JSON.parse(metadata.order_details);

                // Support both old (full keys) and new (compressed keys) metadata formats
                const isCompressed = !!rawData.s;
                const orderData = isCompressed ? {
                    shipping: {
                        email: rawData.s.e,
                        firstName: rawData.s.f,
                        lastName: rawData.s.l,
                        address: rawData.s.a,
                        city: rawData.s.c,
                        postalCode: rawData.s.z,
                        zip: rawData.s.z,
                        phone: rawData.s.p,
                        zasilkovna_id: rawData.s.zi,
                        zasilkovna_name: rawData.s.zn,
                    },
                    items: rawData.i.map((i: any) => ({ id: i.id, quantity: i.q })),
                    carrier: rawData.ca,
                    discount: rawData.d ? { code: rawData.d.code, amount: rawData.d.amt, freeShipping: rawData.d.fs } : null,
                } : rawData;

                // Generate Variable Symbol (VS)
                const startVS = 202500003;
                let nextVS = startVS.toString();
                try {
                    const lastOrder = await prisma.order.findFirst({
                        where: { NOT: { variableSymbol: null } },
                        orderBy: { variableSymbol: 'desc' }
                    });
                    if (lastOrder && lastOrder.variableSymbol) {
                        const lastVSNum = parseInt(lastOrder.variableSymbol);
                        if (!isNaN(lastVSNum) && lastVSNum >= startVS) {
                            nextVS = (lastVSNum + 1).toString();
                        }
                    }
                } catch (vsError) {
                    console.error("Error generating VS:", vsError);
                    nextVS = (startVS + Math.floor(Math.random() * 1000)).toString();
                }

                // 1. Save to Database (Prisma)
                const newOrder: any = {
                    id: session.id,
                    variableSymbol: nextVS,
                    date: new Date(),
                    amount: session.amount_total ? session.amount_total / 100 : 0,
                    discount: orderData.discount?.amount || 0,
                    status: 'paid',
                    carrier: orderData.carrier || 'Neznámo',
                    zasilkovna_branch_id: orderData.shipping?.zasilkovna_id || null,
                    shipping: orderData.shipping,
                    items: orderData.items,
                };

                try {
                    await prisma.order.upsert({
                        where: { id: session.id },
                        update: newOrder,
                        create: newOrder
                    });
                    console.log("Order saved/updated in Prisma:", session.id, "VS:", nextVS);

                    // Increment discount usage if applicable
                    if (orderData.discount?.code) {
                        try {
                            await prisma.discountCode.update({
                                where: { code: orderData.discount.code },
                                data: { usageCount: { increment: 1 } }
                            });
                        } catch (discError) {
                            console.error("Discount increment failed:", discError);
                        }
                    }
                } catch (dbError) {
                    console.error("CRITICAL: Failed to save order to Prisma:", dbError);
                    // On Vercel this is the primary storage, so we should log it loudly
                }

                // Local fallback (only works for dev or if re-deploying)
                const dbPath = path.join(process.cwd(), "src/data/orders.json");
                try {
                    let orders = [];
                    if (fs.existsSync(dbPath)) {
                        const fileContent = fs.readFileSync(dbPath, "utf-8");
                        orders = JSON.parse(fileContent || "[]");
                    }
                    // Avoid duplicates in local JSON
                    const existingIdx = orders.findIndex((o: any) => o.id === newOrder.id);
                    if (existingIdx !== -1) {
                        orders[existingIdx] = { ...newOrder, date: newOrder.date.toISOString() };
                    } else {
                        orders.unshift({ ...newOrder, date: newOrder.date.toISOString() });
                    }
                    fs.writeFileSync(dbPath, JSON.stringify(orders, null, 2));
                } catch (fsError) {
                    // Silently fail FS on Vercel
                }

                // 2. Send emails
                try {
                    // To Customer
                    await resend.emails.send({
                        from: "Matchuji <info@matchuji.cz>",
                        to: orderData.shipping.email,
                        subject: `✅ Objednávka #${nextVS} přijata | Matchuji`,
                        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
    
    <!-- Header -->
    <div style="background:#0c3314;padding:40px 40px 30px;text-align:center;">
      <p style="margin:0 0 8px;color:#a6e22e;font-size:13px;letter-spacing:2px;text-transform:uppercase;font-weight:600;">Objednávka přijata ✓</p>
      <h1 style="margin:0;color:#fff;font-size:28px;font-weight:700;">Matchuji.cz</h1>
    </div>
    
    <!-- Body -->
    <div style="padding:40px;">
      <h2 style="margin:0 0 16px;color:#0c3314;font-size:22px;">Ahoj ${orderData.shipping.firstName}! 👋</h2>
      <p style="margin:0 0 16px;color:#555;font-size:16px;line-height:1.7;">
        Mockrát ti děkujeme za tvou objednávku! Jsme moc rádi, že jsi si vybral/a naši prémiovou Matchu z japonského Uji a věříme, že si ji maximálně užiješ. 🍵
      </p>
      <p style="margin:0 0 24px;color:#555;font-size:16px;line-height:1.7;">
        Platba úspěšně proběhla a tvá objednávka č. <strong style="color:#0c3314;">#${nextVS}</strong> je teď v našich rukou.
      </p>

      <!-- 48h box -->
      <div style="background:#f0faf0;border-left:4px solid #a6e22e;border-radius:8px;padding:20px 24px;margin:0 0 32px;">
        <p style="margin:0;color:#0c3314;font-size:15px;font-weight:700;">🚀 Expedice do 48 hodin</p>
        <p style="margin:8px 0 0;color:#444;font-size:14px;line-height:1.6;">Vaši Matchu teď začínáme připravovat. Zásilku předáme dopravci nejpozději do 48 hodin od objednávky. Jakmile se tak stane, dáme ti vědět.</p>
      </div>

      <!-- Order summary -->
      <h3 style="margin:0 0 16px;color:#0c3314;font-size:16px;border-bottom:2px solid #f0f0f0;padding-bottom:10px;">Detaily doručení</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
        <tr><td style="padding:8px 0;color:#888;font-size:14px;width:120px;">Jméno</td><td style="padding:8px 0;color:#333;font-size:14px;font-weight:600;">${orderData.shipping.firstName} ${orderData.shipping.lastName}</td></tr>
        <tr style="background:#fafafa;"><td style="padding:8px 6px;color:#888;font-size:14px;">Adresa</td><td style="padding:8px 6px;color:#333;font-size:14px;font-weight:600;">${orderData.shipping.address}, ${orderData.shipping.city} ${orderData.shipping.postalCode || ''}</td></tr>
        <tr><td style="padding:8px 0;color:#888;font-size:14px;">Doprava</td><td style="padding:8px 0;color:#333;font-size:14px;font-weight:600;">${orderData.carrier}${orderData.shipping.zasilkovna_name ? ' – ' + orderData.shipping.zasilkovna_name : ''}</td></tr>
        <tr style="background:#fafafa;"><td style="padding:8px 6px;color:#888;font-size:14px;">Celkem</td><td style="padding:8px 6px;color:#0c3314;font-size:15px;font-weight:700;">${newOrder.amount} Kč</td></tr>
      </table>

      <p style="margin:0 0 8px;color:#555;font-size:15px;line-height:1.7;">Máš-li jakékoli dotazy, napiš nám na <a href="mailto:info@matchuji.cz" style="color:#0c3314;font-weight:600;">info@matchuji.cz</a> a my ti co nejdříve odpovíme.</p>
      <p style="margin:24px 0 0;color:#555;font-size:15px;line-height:1.7;">S láskou k Matche,<br/><strong style="color:#0c3314;">Tým Matchuji 🍃</strong></p>
    </div>

    <!-- Footer -->
    <div style="background:#f5f5f0;padding:24px 40px;text-align:center;border-top:1px solid #e8e8e8;">
      <p style="margin:0;color:#aaa;font-size:12px;">© ${new Date().getFullYear()} Matchuji.cz | <a href="https://matchuji.cz" style="color:#aaa;">www.matchuji.cz</a></p>
    </div>
  </div>
</body>
</html>
              `,
                    });

                    // To Admin
                    await resend.emails.send({
                        from: "Matchuji System <info@matchuji.cz>",
                        to: "janspanelwork@gmail.com",
                        subject: `🛍️ Nová objednávka #${nextVS} – ${orderData.shipping.firstName} ${orderData.shipping.lastName} (${newOrder.amount} Kč)`,
                        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
    
    <div style="background:#0c3314;padding:30px 40px;">
      <p style="margin:0 0 4px;color:#a6e22e;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Nová objednávka</p>
      <h1 style="margin:0;color:#fff;font-size:24px;">Objednávka #${nextVS}</h1>
    </div>

    <div style="padding:32px 40px;">

      <!-- Amount highlight -->
      <div style="background:#f0faf0;border-radius:8px;padding:20px;text-align:center;margin-bottom:28px;">
        <p style="margin:0;color:#888;font-size:13px;">Celková částka</p>
        <p style="margin:8px 0 0;color:#0c3314;font-size:36px;font-weight:800;">${newOrder.amount} Kč</p>
      </div>

      <h3 style="margin:0 0 12px;color:#0c3314;font-size:15px;border-bottom:2px solid #f0f0f0;padding-bottom:8px;">👤 Zákazník</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px;">
        <tr><td style="padding:7px 0;color:#888;width:130px;">Jméno</td><td style="padding:7px 0;color:#333;font-weight:600;">${orderData.shipping.firstName} ${orderData.shipping.lastName}</td></tr>
        <tr style="background:#fafafa;"><td style="padding:7px 6px;color:#888;">Email</td><td style="padding:7px 6px;"><a href="mailto:${orderData.shipping.email}" style="color:#0c3314;font-weight:600;">${orderData.shipping.email}</a></td></tr>
        <tr><td style="padding:7px 0;color:#888;">Telefon</td><td style="padding:7px 0;color:#333;font-weight:600;">${orderData.shipping.phone || '–'}</td></tr>
      </table>

      <h3 style="margin:0 0 12px;color:#0c3314;font-size:15px;border-bottom:2px solid #f0f0f0;padding-bottom:8px;">📦 Doručení</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px;">
        <tr><td style="padding:7px 0;color:#888;width:130px;">Adresa</td><td style="padding:7px 0;color:#333;font-weight:600;">${orderData.shipping.address}, ${orderData.shipping.city} ${orderData.shipping.postalCode || ''}</td></tr>
        <tr style="background:#fafafa;"><td style="padding:7px 6px;color:#888;">Dopravce</td><td style="padding:7px 6px;color:#333;font-weight:600;">${orderData.carrier}</td></tr>
        ${orderData.shipping.zasilkovna_name ? `<tr><td style="padding:7px 0;color:#888;">Zásilkovna</td><td style="padding:7px 0;color:#333;font-weight:600;">${orderData.shipping.zasilkovna_name}</td></tr>` : ''}
      </table>

      ${orderData.discount ? `
      <h3 style="margin:0 0 12px;color:#0c3314;font-size:15px;border-bottom:2px solid #f0f0f0;padding-bottom:8px;">🎟️ Sleva</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px;">
        <tr><td style="padding:7px 0;color:#888;width:130px;">Kód</td><td style="padding:7px 0;color:#333;font-weight:600;">${orderData.discount.code}</td></tr>
        <tr style="background:#fafafa;"><td style="padding:7px 6px;color:#888;">Sleva</td><td style="padding:7px 6px;color:#c0392b;font-weight:700;">-${orderData.discount.amount} Kč</td></tr>
      </table>
      ` : ''}

      <div style="background:#fff3cd;border-radius:8px;padding:16px 20px;font-size:14px;color:#856404;">
        <strong>Variabilní symbol:</strong> ${nextVS}
      </div>
    </div>

    <div style="background:#f5f5f0;padding:16px 40px;border-top:1px solid #e8e8e8;">
      <p style="margin:0;color:#aaa;font-size:12px;text-align:center;">Matchuji admin systém • ${new Date().toLocaleString('cs-CZ')}</p>
    </div>
  </div>
</body>
</html>
              `,
                    });
                } catch (emailError) {
                    console.error("Email notification failed:", emailError);
                }
            } catch (jsonError) {
                console.error("Metadata parse error:", jsonError);
            }
        }
    }

    return NextResponse.json({ received: true });
}
