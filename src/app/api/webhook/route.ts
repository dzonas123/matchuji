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
                const orderData = JSON.parse(metadata.order_details);

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
                    // Fallback to random if VS generation fails to ensure order is saved
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
                        subject: "Potvrzení vaší objednávky | Matchuji",
                        html: `
                <div style="font-family: sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
                    <h1 style="color: #0c3314;">Děkujeme za vaši objednávku!</h1>
                    <p>Vaše platba úspěšně proběhla a objednávku (<strong>#${nextVS}</strong>) jsme v pořádku přijali.</p>
                    <div style="background: #eaffea; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #a6e22e;">
                        <strong>Vaši Matchu právě teď začínáme připravovat. Zásilka bude expedována nejpozději do 48 hodin.</strong>
                    </div>
                    <h3 style="color: #0c3314; border-bottom: 1px solid #eee; padding-bottom: 8px;">Detaily doručení</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin-bottom: 8px;">👤 <strong>Jméno:</strong> ${orderData.shipping.firstName} ${orderData.shipping.lastName}</li>
                        <li style="margin-bottom: 8px;">📍 <strong>Adresa:</strong> ${orderData.shipping.address}, ${orderData.shipping.city} ${orderData.shipping.zip}</li>
                        <li style="margin-bottom: 8px;">🚚 <strong>Doprava:</strong> ${orderData.carrier}</li>
                    </ul>
                    <p style="margin-top: 20px;">Jakmile balíček předáme dopravci, dáme vám znovu vědět.</p>
                    <p style="margin-top: 30px; font-size: 0.9em; color: #666; border-top: 1px solid #eee; padding-top: 15px;">S pozdravem,<br/>Tým Matchuji.cz</p>
                </div>
              `,
                    });

                    // To Admin
                    await resend.emails.send({
                        from: "Matchuji System <info@matchuji.cz>",
                        to: "janspanelwork@gmail.com",
                        subject: `Nová objednávka Matchuji! (#${nextVS})`,
                        html: `
                <h1>Nová objednávka od ${orderData.shipping.firstName} ${orderData.shipping.lastName}</h1>
                <p>Email: ${orderData.shipping.email}</p>
                <p>Částka: ${newOrder.amount} CZK</p>
                <p>Doprava: ${orderData.carrier}</p>
                <p><strong>VS: ${nextVS}</strong></p>
                <pre>${JSON.stringify(orderData, null, 2)}</pre>
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
