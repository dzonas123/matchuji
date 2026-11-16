import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
    try {
        const { sku, ean, stock } = await req.json();

        if ((!sku && !ean) || stock === undefined) {
            return NextResponse.json({ error: "Missing sku/ean or stock value" }, { status: 400 });
        }

        const newStock = parseInt(stock);
        const where: any = {};
        if (sku) where.sku = sku;
        else if (ean) where.ean = ean;

        let product = null;
        let prismaSuccess = false;

        // 1. Try Prisma Update
        try {
            product = await prisma.product.findFirst({ where });
            if (product) {
                const updated = await prisma.product.update({
                    where: { id: product.id },
                    data: { stock: newStock }
                });
                product = updated;
                prismaSuccess = true;
                console.log(`Stock updated in Prisma for ${sku || ean}: ${newStock}`);
            }
        } catch (dbError) {
            console.warn("Stock update: Prisma failed, trying local fallback");
        }

        // 2. Local Fallback (Update JSON)
        const dbPath = path.join(process.cwd(), "src/data/products.json");
        try {
            if (fs.existsSync(dbPath)) {
                const fileContent = fs.readFileSync(dbPath, "utf-8");
                let products = JSON.parse(fileContent || "[]");

                const idx = products.findIndex((p: any) => (sku && p.sku === sku) || (ean && p.ean === ean));
                if (idx !== -1) {
                    products[idx].stock = newStock;
                    fs.writeFileSync(dbPath, JSON.stringify(products, null, 2));
                    console.log(`Stock updated in local JSON for ${sku || ean}: ${newStock}`);
                    if (!product) product = products[idx];
                }
            }
        } catch (fsError) {
            // Read-only on Vercel is expected
        }

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            sku: product.sku,
            ean: product.ean,
            new_stock: product.stock
        });

    } catch (error) {
        console.error("Error updating stock:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
