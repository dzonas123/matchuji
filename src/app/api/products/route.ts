import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "src/data/products.json");

export async function GET() {
    try {
        if (!fs.existsSync(dbPath)) {
            return NextResponse.json([]);
        }
        const fileContent = fs.readFileSync(dbPath, "utf-8");
        const products = JSON.parse(fileContent || "[]");
        return NextResponse.json(products);
    } catch (error) {
        console.error("API Error (GET Products):", error);
        return NextResponse.json([], { status: 200 });
    }
}

export async function POST(req: Request) {
    try {
        const updatedProduct = await req.json();
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
            console.error("Write error:", writeError);
            return NextResponse.json({
                error: "Nelze uložit změny. Na Vercelu je souborový systém pouze pro čtení. Pro trvalé úpravy doporučuji připojit databázi (např. Vercel Postgres).",
                details: writeError instanceof Error ? writeError.message : String(writeError)
            }, { status: 500 });
        }

        return NextResponse.json({ success: true, product: updatedProduct });
    } catch (error) {
        console.error("API Error (POST Products):", error);
        return NextResponse.json({ error: "Chyba při zpracování požadavku" }, { status: 500 });
    }
}
