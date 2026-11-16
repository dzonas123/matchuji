import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { path } = await req.json();
        const userAgent = req.headers.get('user-agent') || 'Unknown';
        
        await prisma.visit.create({
            data: {
                path,
                userAgent
            }
        });
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error tracking visit:', error);
        return NextResponse.json({ error: 'Failed to track visit' }, { status: 500 });
    }
}
