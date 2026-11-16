import { NextResponse } from "next/server";

export function GET() {
    const apiKey = process.env.PACKETA_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: "Packeta is not configured" }, { status: 503 });
    }

    return NextResponse.json({ apiKey });
}
