import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const dbPath = path.join(process.cwd(), "src/data/orders.json");

    try {
        // Try Prisma first
        try {
            const orders = await prisma.order.findMany({
                orderBy: { date: 'desc' }
            });
            if (orders.length > 0) return NextResponse.json(orders);
        } catch (dbError) {
            console.warn("Prisma orders fetch failed, using local JSON fallback:", dbError);
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
