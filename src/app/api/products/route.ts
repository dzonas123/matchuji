import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";

const dbPath = path.join(process.cwd(), "src/data/products.json");

export async function GET() {
    try {
        // Try Supabase first
        if (supabase) {
            const { data, error } = await supabase.from('products').select('*');
            if (!error && data) return NextResponse.json(data);
            console.warn("Supabase products fetch failed, using local JSON fallback:", error);
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

        // Try Supabase first
        if (supabase) {
            const { error } = await supabase
                .from('products')
                .upsert(updatedProduct);

            if (!error) return NextResponse.json({ success: true, product: updatedProduct });
            console.error("Supabase upsert error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Fallback for local dev (will error on Vercel)
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
                error: "Vercel nepodporuje přímé ukládání do souborů. Pro uložení konfigurujte Supabase (NEXT_PUBLIC_SUPABASE_URL a NEXT_PUBLIC_SUPABASE_ANON_KEY).",
                details: writeError instanceof Error ? writeError.message : String(writeError)
            }, { status: 500 });
        }

        return NextResponse.json({ success: true, product: updatedProduct });
    } catch (error) {
        console.error("API Error (POST Products):", error);
        return NextResponse.json({ error: "Chyba při zpracování požadavku" }, { status: 500 });
    }
}
