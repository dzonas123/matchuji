import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    const dbPath = path.join(process.cwd(), "src/data/orders.json");

    try {
        // 1. Fetch products for enrichment
        let productMap = new Map();
        try {
            const products = await prisma.product.findMany();
            products.forEach(p => productMap.set(p.id, p));
        } catch (pError) {
            console.warn("Fulfillment enrichment: Could not fetch products from DB");
        }

        // 2. Fetch orders matching "paid" status
        let orders = [];
        let prismaSuccess = false;

        try {
            orders = await prisma.order.findMany({
                where: { status: "paid" },
                orderBy: { date: "asc" },
            });
            prismaSuccess = true;
        } catch (dbError) {
            console.warn("Fulfillment: Prisma fetch failed, checking local fallback");
        }

        // 3. Local fallback if Prisma fails
        if (!prismaSuccess && fs.existsSync(dbPath)) {
            try {
                const fileContent = fs.readFileSync(dbPath, "utf-8");
                const localOrders = JSON.parse(fileContent || "[]");
                orders = localOrders.filter((o: any) => o.status === "paid");
            } catch (fsError) {
                console.error("Fulfillment: Local fallback failed:", fsError);
            }
        }

        // 4. Transform for fulfillment system
        const formattedOrders = orders.map((order: any) => {
            const items = (Array.isArray(order.items) ? order.items : []).map((item: any) => {
                const product = productMap.get(item.id);
                return {
                    name: product?.name || item.name || "Neznámý produkt",
                    sku: product?.sku || item.sku || "NENASTAVENO",
                    ean: product?.ean || item.ean || "NENASTAVENO",
                    quantity: item.quantity,
                    price: product?.price || item.price || 0
                };
            });

            return {
                id: order.id,
                variableSymbol: order.variableSymbol || order.id.slice(-8).toUpperCase(),
                date: order.date,
                amount: order.amount,
                shipping: order.shipping,
                carrier: order.carrier,
                zasilkovna_branch_id: order.zasilkovna_branch_id || order.shipping?.zasilkovna_id || null,
                items,
            };
        });

        return NextResponse.json(formattedOrders);
    } catch (error) {
        console.error("CRITICAL API Error (Fulfillment):", error);
        return NextResponse.json([], { status: 200 }); // Return empty rather than 500
    }
}
