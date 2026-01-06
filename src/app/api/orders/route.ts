import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";

export async function GET() {
    const dbPath = path.join(process.cwd(), "src/data/orders.json");

    try {
        // Try Supabase first
        if (supabase) {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('date', { ascending: false });

            if (!error && data) return NextResponse.json(data);
            console.warn("Supabase orders fetch failed, using local JSON fallback:", error);
        }

        // Fallback or local dev
        if (!fs.existsSync(dbPath)) {
            return NextResponse.json([]);
        }
        const fileContent = fs.readFileSync(dbPath, "utf-8");
        const orders = JSON.parse(fileContent || "[]");
        return NextResponse.json(orders);
    } catch (error) {
        console.error("API Error (GET Orders):", error);
        return NextResponse.json([], { status: 200 });
    }
}
