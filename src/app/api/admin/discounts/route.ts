import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const discounts = await prisma.discountCode.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(discounts);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch discounts" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const discount = await prisma.discountCode.upsert({
            where: { id: data.id || 'new-id' },
            update: {
                code: data.code.toUpperCase(),
                type: data.type,
                value: parseFloat(data.value),
                minAmount: parseFloat(data.minAmount || 0),
                isActive: data.isActive,
                maxUsages: data.maxUsages ? parseInt(data.maxUsages) : null,
                expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
            },
            create: {
                code: data.code.toUpperCase(),
                type: data.type,
                value: parseFloat(data.value),
                minAmount: parseFloat(data.minAmount || 0),
                isActive: data.isActive,
                maxUsages: data.maxUsages ? parseInt(data.maxUsages) : null,
                expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
            }
        });
        return NextResponse.json(discount);
    } catch (error) {
        console.error("Error saving discount:", error);
        return NextResponse.json({ error: "Failed to save discount" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        await prisma.discountCode.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete discount" }, { status: 500 });
    }
}
