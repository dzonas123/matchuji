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
        const { items, shipping, carrier, discount } = await req.json();

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://matchuji.vercel.app";

        const line_items = items.map((item: any) => {
            const imageUrl = item.image.startsWith('http')
                ? item.image
                : `${baseUrl.replace(/\/$/, '')}/${item.image.replace(/^\//, '')}`;

            return {
                price_data: {
                    currency: "czk",
                    product_data: {
                        name: item.name,
                        images: [imageUrl],
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            };
        });

        // Calculate shipping cost
        const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
        let shippingCost = subtotal > 800 ? 0 : carrier.price;

        // Apply Free Shipping discount if active
        if (discount?.freeShipping) {
            shippingCost = 0;
        }

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

        // Prepare Stripe Session configuration
        const sessionConfig: any = {
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${baseUrl.replace(/\/$/, '')}/checkout?step=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl.replace(/\/$/, '')}/checkout`,
            customer_email: shipping.email,
            metadata: {
                order_details: JSON.stringify({
                    s: {
                        e: shipping.email,
                        f: shipping.firstName,
                        l: shipping.lastName,
                        a: shipping.address,
                        c: shipping.city,
                        z: shipping.postalCode,
                        p: shipping.phone,
                        zi: shipping.zasilkovna_id || null,
                        zn: shipping.zasilkovna_name ? shipping.zasilkovna_name.substring(0, 30) : null,
                    },
                    i: items.map((i: any) => ({ id: i.id, q: i.quantity })),
                    ca: carrier.name,
                    d: discount ? { code: discount.code, amt: discount.amount, fs: discount.freeShipping || false } : null,
                }),
            },
        };

        // Add discount via Stripe Coupon (to avoid negative unit_amount error)
        if (discount && discount.amount > 0) {
            try {
                const coupon = await stripe.coupons.create({
                    amount_off: Math.round(discount.amount * 100),
                    currency: "czk",
                    duration: "once",
                    name: `Sleva ${discount.code}`,
                });
                sessionConfig.discounts = [{ coupon: coupon.id }];
            } catch (couponError) {
                console.error("Failed to create Stripe coupon:", couponError);
                // Fallback: If coupon creation fails, we might have to adjust line items or show error
                // but usually it works fine.
            }
        }

        const session = await stripe.checkout.sessions.create(sessionConfig);

        return NextResponse.json({ id: session.id, url: session.url });
    } catch (err: any) {
        console.error("Stripe error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
