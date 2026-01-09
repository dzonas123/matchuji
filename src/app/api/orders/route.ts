import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const dbPath = path.join(process.cwd(), "src/data/orders.json");

    try {
        // Fetch all products to enrich items with SKU/EAN
        const products = await prisma.product.findMany();
        const productMap = new Map();
        products.forEach(p => productMap.set(p.id, p));

        // Try Prisma first
        let orders = [];
        try {
            orders = await prisma.order.findMany({
                orderBy: { date: 'desc' }
            });
        } catch (dbError) {
            console.warn("Prisma orders fetch failed, using local JSON fallback:", dbError);
            if (fs.existsSync(dbPath)) {
                const fileContent = fs.readFileSync(dbPath, "utf-8");
                orders = JSON.parse(fileContent || "[]");
            }
        }

        // Enrich orders with item details (SKU, EAN)
        const enrichedOrders = orders.map((order: any) => {
            const items = (order.items || []).map((item: any) => {
                const product = productMap.get(item.id);
                return {
                    ...item,
                    name: product?.name || item.name || "Neznámý produkt",
                    sku: product?.sku || item.sku || "Nenastaveno",
                    ean: product?.ean || item.ean || "Nenastaveno",
                };
            });
            return { ...order, items };
        });

        return NextResponse.json(enrichedOrders);
    } catch (error) {
        console.error("API Error (GET Orders):", error);
        return NextResponse.json([], { status: 200 });
    }
}

