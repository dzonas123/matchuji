import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";

const dbPath = path.join(process.cwd(), "src/data/products.json");

export async function GET() {
    try {
        // Try Prisma first
        try {
            const products = await prisma.product.findMany({
                orderBy: { createdAt: 'desc' }
            });
            if (products.length > 0) return NextResponse.json(products);
        } catch (dbError) {
            console.warn("Prisma products fetch failed, using local JSON fallback:", dbError);
        }

        // Fallback or local dev
        if (!fs.existsSync(dbPath)) return NextResponse.json([]);
        const fileContent = fs.readFileSync(dbPath, "utf-8");
        return NextResponse.json(JSON.parse(fileContent || "[]"));
    } catch (error) {
        console.error("API Error (GET Products):", error);
        return NextResponse.json([], { status: 200 });
    }
}

export async function POST(req: Request) {
    try {
        const updatedProduct = await req.json();

        // Try Prisma first
        try {
            const product = await prisma.product.upsert({
                where: { id: updatedProduct.id },
                update: {
                    name: updatedProduct.name,
                    price: updatedProduct.price,
                    stock: updatedProduct.stock,
                    image: updatedProduct.image,
                },
                create: {
                    id: updatedProduct.id,
                    name: updatedProduct.name,
                    price: updatedProduct.price,
                    stock: updatedProduct.stock,
                    image: updatedProduct.image,
                },
            });
            return NextResponse.json({ success: true, product });
        } catch (dbError) {
            console.error("Prisma upsert error:", dbError);
            if (process.env.NODE_ENV === 'production') {
                return NextResponse.json({ error: "Chyba při ukládání do databáze." }, { status: 500 });
            }
        }

        // Fallback for local dev
        let products = [];
        if (fs.existsSync(dbPath)) {
            const fileContent = fs.readFileSync(dbPath, "utf-8");
            products = JSON.parse(fileContent || "[]");
        }

        const index = products.findIndex((p: any) => p.id === updatedProduct.id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
        } else {
            products.push(updatedProduct);
        }

        try {
            fs.writeFileSync(dbPath, JSON.stringify(products, null, 2));
        } catch (writeError) {
            return NextResponse.json({
                error: "Vercel nepodporuje přímé ukládání do souborů. Pro uložení konfigurujte Prisma Postgres.",
                details: writeError instanceof Error ? writeError.message : String(writeError)
            }, { status: 500 });
        }

        return NextResponse.json({ success: true, product: updatedProduct });
    } catch (error) {
        console.error("API Error (POST Products):", error);
        return NextResponse.json({ error: "Chyba při zpracování požadavku" }, { status: 500 });
    }
}
