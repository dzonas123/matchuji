import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const dbPath = path.join(process.cwd(), "src/data/orders.json");

    try {
        // Fetch all products safely
        let productMap = new Map();
        try {
            const products = await prisma.product.findMany();
            products.forEach(p => productMap.set(p.id, p));
        } catch (pError) {
            console.warn("Could not fetch products for enrichment:", pError);
        }

        // Try Prisma first
        let orders = [];
        let prismaSuccess = false;
        try {
            orders = await prisma.order.findMany({
                orderBy: { date: 'desc' }
            });
            prismaSuccess = true;
        } catch (dbError) {
            console.warn("Prisma orders fetch failed, using local JSON fallback:", dbError);
        }

        // Fallback or Merge with local JSON (for dev environments)
        if (!prismaSuccess || fs.existsSync(dbPath)) {
            try {
                if (fs.existsSync(dbPath)) {
                    const fileContent = fs.readFileSync(dbPath, "utf-8");
                    const localOrders = JSON.parse(fileContent || "[]");

                    if (!prismaSuccess) {
                        orders = localOrders;
                    } else {
                        // Optional: merge and deduplicate if needed
                        // For now we trust Prisma if it succeeded
                    }
                }
            } catch (fsError) {
                console.error("Local JSON fallback failed:", fsError);
            }
        }

        // Enrich orders with item details (SKU, EAN)
        const enrichedOrders = orders.map((order: any) => {
            const items = (Array.isArray(order.items) ? order.items : []).map((item: any) => {
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
        console.error("CRITICAL API Error (GET Orders):", error);
        return NextResponse.json([], { status: 200 });
    }
}
