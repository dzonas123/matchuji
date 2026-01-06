import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";

// Initialize lazily to prevent build-time crashes
const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-01-27.acacia" as any,
});

const getResend = () => new Resend(process.env.RESEND_API_KEY || "re_fallback");

export async function POST(req: Request) {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
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
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        // Extract order details from metadata
        const metadata = session.metadata;
        if (metadata && metadata.order_details) {
            const orderData = JSON.parse(metadata.order_details);

            // 1. Save to Database (Supabase)
            const newOrder = {
                id: session.id,
                date: new Date().toISOString(),
                amount: session.amount_total ? session.amount_total / 100 : 0,
                status: 'paid',
                ...orderData
            };

            if (supabase) {
                const { error: dbError } = await supabase
                    .from('orders')
                    .insert(newOrder);

                if (dbError) {
                    console.error("Failed to save order to Supabase:", dbError);
                } else {
                    console.log("Order successfully saved to Supabase:", session.id);
                }
            }

            // Keep local fallback for dev, but it will silent fail on Vercel (intentional)
            const dbPath = path.join(process.cwd(), "src/data/orders.json");
            try {
                let orders = [];
                if (fs.existsSync(dbPath)) {
                    const fileContent = fs.readFileSync(dbPath, "utf-8");
                    orders = JSON.parse(fileContent || "[]");
                }
                orders.unshift(newOrder);
                fs.writeFileSync(dbPath, JSON.stringify(orders, null, 2));
            } catch (fsError) {
                // Silently skip if FS is read-only
            }

            // 2. Send emails
            try {
                // To Customer
                await resend.emails.send({
                    from: "Matchuji <objednavky@matchuji.cz>",
                    to: orderData.shipping.email,
                    subject: "Potvrzení vaší objednávky Matchuji",
                    html: `
            <h1>Děkujeme za vaši objednávku!</h1>
            <p>Vaše objednávka byla úspěšně přijata a zaplacena.</p>
            <p><strong>Dlabší info:</strong></p>
            <ul>
              <li>Jméno: ${orderData.shipping.firstName} ${orderData.shipping.lastName}</li>
              <li>Adresa: ${orderData.shipping.address}, ${orderData.shipping.city}</li>
              <li>Doprava: ${orderData.carrier}</li>
            </ul>
            <p>Jakmile balíček odešleme, dáme vám vědět.</p>
          `,
                });

                // To Admin
                await resend.emails.send({
                    from: "Matchuji System <system@matchuji.cz>",
                    to: "admin@matchuji.cz", // User should replace this
                    subject: "Nová objednávka Matchuji!",
                    html: `
            <h1>Nová objednávka od ${orderData.shipping.firstName} ${orderData.shipping.lastName}</h1>
            <p>Email: ${orderData.shipping.email}</p>
            <p>Částka: ${session.amount_total ? session.amount_total / 100 : 0} CZK</p>
            <p>Doprava: ${orderData.carrier}</p>
            <pre>${JSON.stringify(orderData, null, 2)}</pre>
          `,
                });
            } catch (emailError) {
                console.error("Email sending failed:", emailError);
            }
        }
    }

    return NextResponse.json({ received: true });
}
