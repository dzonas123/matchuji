import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    const dbPath = path.join(process.cwd(), "src/data/orders.json");

    try {
        if (fs.existsSync(dbPath)) {
            const fileContent = fs.readFileSync(dbPath, "utf-8");
            const orders = JSON.parse(fileContent);
            return NextResponse.json(orders);
        } else {
            return NextResponse.json([]);
        }
    } catch (error) {
        return NextResponse.json({ error: "Failed to load orders" }, { status: 500 });
    }
}
