import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { Resend } from "resend";

const getResend = () => new Resend(process.env.RESEND_API_KEY || "re_fallback");

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { status, zasilkovna_tracking_number } = await req.json();
        const { id } = await params;

        if (!status) {
            return NextResponse.json({ error: "Status is required" }, { status: 400 });
        }

        const currentOrder = await prisma.order.findUnique({
            where: { id }
        });

        if (!currentOrder) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const updatedOrder = await prisma.order.update({
            where: { id },
            data: { 
                status,
                ...(zasilkovna_tracking_number !== undefined && { zasilkovna_tracking_number })
            },
        });

        // Send email notification if status changed
        if (currentOrder.status !== status && currentOrder.shipping) {
            const shipping = currentOrder.shipping as any;
            if (shipping && shipping.email) {
                const resend = getResend();
                let subject = "";
                let htmlContent = "";
                const firstName = shipping.firstName || "zákazníku";

                if (status === "packed") {
                    subject = `📦 Vaše objednávka #${currentOrder.variableSymbol || currentOrder.id.slice(-6).toUpperCase()} je zabalena | Matchuji`;
                    htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
    <div style="background:#0c3314;padding:30px 40px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:24px;">Zabaleno a připraveno!</h1>
    </div>
    <div style="padding:40px;">
      <h2 style="margin:0 0 16px;color:#0c3314;font-size:20px;">Ahoj ${firstName},</h2>
      <p style="margin:0 0 16px;color:#555;font-size:16px;line-height:1.6;">
        Tvoje objednávka <strong>#${currentOrder.variableSymbol || currentOrder.id.slice(-6).toUpperCase()}</strong> je čerstvě zabalena a připravena na cestu k tobě!
      </p>
      <div style="background:#f0faf0;border-left:4px solid #a6e22e;padding:16px 20px;margin:24px 0;">
        <p style="margin:0;color:#0c3314;font-size:15px;">Balíček brzy předáme přepravci (${currentOrder.carrier || 'dopravce'}). Jakmile bude na cestě, dáme ti vědět.</p>
      </div>
      <p style="margin:24px 0 0;color:#555;font-size:15px;">Těšíme se, až naši Matchu ochutnáš!<br/><strong style="color:#0c3314;">Tým Matchuji 🍃</strong></p>
    </div>
  </div>
</body>
</html>`;
                } else if (status === "shipped") {
                    subject = `🚚 Vaše objednávka #${currentOrder.variableSymbol || currentOrder.id.slice(-6).toUpperCase()} je na cestě | Matchuji`;
                    htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
    <div style="background:#0c3314;padding:30px 40px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:24px;">Balíček je na cestě!</h1>
    </div>
    <div style="padding:40px;">
      <h2 style="margin:0 0 16px;color:#0c3314;font-size:20px;">Ahoj ${firstName},</h2>
      <p style="margin:0 0 16px;color:#555;font-size:16px;line-height:1.6;">
        Skvělé zprávy! Tvoje objednávka <strong>#${currentOrder.variableSymbol || currentOrder.id.slice(-6).toUpperCase()}</strong> byla právě odeslána a teď už je v rukou přepravce.
      </p>
      <div style="background:#f0faf0;border-left:4px solid #a6e22e;padding:16px 20px;margin:24px 0;">
        <p style="margin:0;color:#0c3314;font-size:15px;">Můžeš očekávat, že ti zásilka přijde v nejbližších dnech. Brzy od přepravce obdržíš informace ke sledování.</p>
        \${updatedOrder.zasilkovna_tracking_number ? \`<div style="margin-top:12px;"><a href="https://tracking.packeta.com/cs_CZ/?id=\${updatedOrder.zasilkovna_tracking_number}" style="display:inline-block;background:#a6e22e;color:#0c3314;padding:8px 16px;text-decoration:none;border-radius:6px;font-weight:bold;font-size:14px;">Sledovat zásilku</a><p style="margin:6px 0 0 0;font-size:13px;color:#555;">Sledovací číslo: \${updatedOrder.zasilkovna_tracking_number}</p></div>\` : ''}
      </div>
      <p style="margin:24px 0 0;color:#555;font-size:15px;">Děkujeme za tvůj nákup!<br/><strong style="color:#0c3314;">Tým Matchuji 🍃</strong></p>
    </div>
  </div>
</body>
</html>`;
                } else if (status === "delivered") {
                    subject = `🌱 Jak ti chutná Matcha? Získej slevu! | Matchuji`;
                    htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
    <div style="background:#0c3314;padding:30px 40px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:24px;">Zásilka vyzvednuta!</h1>
    </div>
    <div style="padding:40px;">
      <h2 style="margin:0 0 16px;color:#0c3314;font-size:20px;">Ahoj ${firstName},</h2>
      <p style="margin:0 0 16px;color:#555;font-size:16px;line-height:1.6;">
        Tvoje objednávka <strong>#${currentOrder.variableSymbol || currentOrder.id.slice(-6).toUpperCase()}</strong> byla úspěšně vyzvednuta. Tak co, jak ti naše Matcha chutná?
      </p>
      <div style="background:#f0fdf4;border:2px dashed #a6e22e;border-radius:8px;padding:20px;text-align:center;margin:24px 0;">
        <h3 style="margin:0 0 12px;color:#166534;font-size:18px;">📸 Získej slevu na další nákup!</h3>
        <p style="margin:0;color:#166534;font-size:15px;line-height:1.5;">
          Vyfoť nebo natoč video s naší Matchou na Instagram (do stories nebo jako příspěvek), označ nás <strong>@matchuji.cz</strong> a my ti do zpráv pošleme unikátní kód se slevou na tvou další objednávku!
        </p>
      </div>
      <p style="margin:24px 0 0;color:#555;font-size:15px;">Užij si ten nejlepší matcha rituál.<br/><strong style="color:#0c3314;">Tým Matchuji 🍃</strong></p>
    </div>
  </div>
</body>
                    </html>`;
                } else if (status === "delayed") {
                    subject = `⚠️ Zpoždění objednávky #${currentOrder.variableSymbol || currentOrder.id.slice(-6).toUpperCase()} | Matchuji`;
                    htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
    <div style="background:#0c3314;padding:30px 40px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:24px;">Omlouváme se za zpoždění</h1>
    </div>
    <div style="padding:40px;">
      <h2 style="margin:0 0 16px;color:#0c3314;font-size:20px;">Ahoj ${firstName},</h2>
      <p style="margin:0 0 16px;color:#555;font-size:16px;line-height:1.6;">
        Tvoje objednávka <strong>#${currentOrder.variableSymbol || currentOrder.id.slice(-6).toUpperCase()}</strong> má bohužel drobné zpoždění. Moc se omlouváme, děláme vše pro to, aby k tobě zásilka dorazila co nejdříve.
      </p>
      <div style="background:#fef2f2;border-left:4px solid #ef4444;padding:16px 20px;margin:24px 0;">
        <p style="margin:0;color:#991b1b;font-size:15px;line-height:1.5;">Jako malou omluvu za čekání od nás přijmi slevový kód 15 % na tvou další objednávku:<br/><br/>
        <strong style="font-size:20px;letter-spacing:1px;display:block;text-align:center;color:#b91c1c;">ZPOZDENI15</strong></p>
      </div>
      <p style="margin:24px 0 0;color:#555;font-size:15px;">Děkujeme za tvou trpělivost.<br/><strong style="color:#0c3314;">Tým Matchuji 🍃</strong></p>
    </div>
  </div>
</body>
</html>`;
                }

                if (subject && htmlContent) {
                    try {
                        await resend.emails.send({
                            from: "Matchuji <info@matchuji.cz>",
                            to: shipping.email,
                            subject,
                            html: htmlContent,
                        });
                        console.log(`Email sent for status ${status} to ${shipping.email}`);
                    } catch (emailErr) {
                        console.error("Failed to send status email:", emailErr);
                    }
                }
            }
        }

        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error("Failed to update order:", error);
        return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.order.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete order:", error);
        return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
    }
}
