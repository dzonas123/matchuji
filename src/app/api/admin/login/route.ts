import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { username, password } = await req.json();

    const validUser = process.env.ADMIN_USERNAME;
    const validPass = process.env.ADMIN_PASSWORD;

    if (!validUser || !validPass) {
        return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    if (username === validUser && password === validPass) {
        return NextResponse.json({ success: true });
    }

    // Small delay to prevent brute force
    await new Promise(r => setTimeout(r, 500));
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
