import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { sku, ean, stock } = await req.json();

        if ((!sku && !ean) || stock === undefined) {
            return NextResponse.json({ error: "Missing sku/ean or stock value" }, { status: 400 });
        }

        const where: any = {};
        if (sku) where.sku = sku;
        else if (ean) where.ean = ean;

        const product = await prisma.product.findFirst({
            where
        });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        const updatedProduct = await prisma.product.update({
            where: { id: product.id },
            data: { stock: parseInt(stock) }
        });

        return NextResponse.json({
            success: true,
            sku: updatedProduct.sku,
            ean: updatedProduct.ean,
            new_stock: updatedProduct.stock
        });
    } catch (error) {
        console.error("Error updating stock:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
