import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Fetch orders with status 'paid' as they are 'new'
        const orders = await prisma.order.findMany({
            where: {
                status: "paid",
            },
            orderBy: { createdAt: "asc" },
        });

        // We need to ensure each item has name, sku, ean, quantity
        // Since items are stored as JSON, we might need to look up products 
        // if the JSON doesn't contain all info.

        const productIds = new Set<string>();
        orders.forEach((order: any) => {
            const items = order.items as any[];
            items.forEach(item => productIds.add(item.id));
        });

        const products = await prisma.product.findMany({
            where: {
                id: { in: Array.from(productIds) }
            }
        });

        const productMap = new Map();
        products.forEach(p => productMap.set(p.id, p));

        const formattedOrders = orders.map((order: any) => {
            const items = (order.items as any[]).map((item: any) => {
                const product = productMap.get(item.id);
                return {
                    name: product?.name || item.name || "Neznámý produkt",
                    sku: product?.sku || item.sku || "",
                    ean: product?.ean || item.ean || "",
                    quantity: item.quantity,
                };
            });

            return {
                id: order.id,
                variableSymbol: order.variableSymbol,
                date: order.date,
                amount: order.amount,
                shipping: order.shipping,
                carrier: order.carrier,
                zasilkovna_branch_id: order.zasilkovna_branch_id,
                items,
            };
        });

        return NextResponse.json(formattedOrders);
    } catch (error) {
        console.error("Error fetching new orders:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}
