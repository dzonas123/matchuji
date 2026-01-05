import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    const dbPath = path.join(process.cwd(), "src/data/orders.json");

    try {
        if (!fs.existsSync(dbPath)) {
            // Ensure directory exists
            const dir = path.dirname(dbPath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(dbPath, JSON.stringify([]));
            return NextResponse.json([]);
        }
        const fileContent = fs.readFileSync(dbPath, "utf-8");
        const orders = JSON.parse(fileContent || "[]");
        return NextResponse.json(orders);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json([], { status: 200 }); // Return empty array instead of error to not break build
    }
}
