import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe lazily or inside the handler to prevent build-time errors
const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-01-27.acacia" as any,
});

export async function POST(req: Request) {
    const stripe = getStripe();
    if (!process.env.STRIPE_SECRET_KEY) {
        return NextResponse.json({ error: "Stripe API key is not configured" }, { status: 500 });
    }
    try {
        const { items, shipping, carrier } = await req.json();

        const line_items = items.map((item: any) => ({
            price_data: {
                currency: "czk",
                product_data: {
                    name: item.name,
                    images: [item.image.startsWith('http') ? item.image : `${process.env.NEXT_PUBLIC_BASE_URL}${item.image}`],
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        // Add shipping cost if applicable
        const total = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
        const shippingCost = total > 800 ? 0 : carrier.price;

        if (shippingCost > 0) {
            line_items.push({
                price_data: {
                    currency: "czk",
                    product_data: {
                        name: `Doprava (${carrier.name})`,
                    },
                    unit_amount: Math.round(shippingCost * 100),
                },
                quantity: 1,
            });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?step=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
            customer_email: shipping.email,
            metadata: {
                order_details: JSON.stringify({
                    shipping,
                    items: items.map((i: any) => ({ id: i.id, quantity: i.quantity })),
                    carrier: carrier.name,
                }),
            },
        });

        return NextResponse.json({ id: session.id, url: session.url });
    } catch (err: any) {
        console.error("Stripe error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
