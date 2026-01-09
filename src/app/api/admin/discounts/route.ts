import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "src/data/discounts.json");

function getLocalDiscounts() {
    if (!fs.existsSync(dbPath)) return [];
    try {
        const fileContent = fs.readFileSync(dbPath, "utf-8");
        return JSON.parse(fileContent || "[]");
    } catch (e) {
        return [];
    }
}

export async function GET() {
    try {
        // Try Prisma first
        try {
            const discounts = await prisma.discountCode.findMany({
                orderBy: { createdAt: 'desc' }
            });
            return NextResponse.json(discounts);
        } catch (dbError) {
            console.warn("Using local discounts fallback");
        }

        return NextResponse.json(getLocalDiscounts());
    } catch (error) {
        return NextResponse.json([]);
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const updatedDiscount = {
            ...data,
            id: data.id || `disc_${Math.random().toString(36).substring(7)}`,
            code: data.code.toUpperCase(),
            value: parseFloat(data.value),
            minAmount: parseFloat(data.minAmount || 0),
            usageCount: data.usageCount || 0,
            createdAt: data.createdAt || new Date().toISOString()
        };

        // 1. Try Prisma
        try {
            const discount = await prisma.discountCode.upsert({
                where: { id: updatedDiscount.id },
                update: {
                    code: updatedDiscount.code,
                    type: updatedDiscount.type,
                    value: updatedDiscount.value,
                    minAmount: updatedDiscount.minAmount,
                    isActive: updatedDiscount.isActive,
                    maxUsages: updatedDiscount.maxUsages ? parseInt(updatedDiscount.maxUsages) : null,
                    expiryDate: updatedDiscount.expiryDate ? new Date(updatedDiscount.expiryDate) : null,
                },
                create: {
                    id: updatedDiscount.id,
                    code: updatedDiscount.code,
                    type: updatedDiscount.type,
                    value: updatedDiscount.value,
                    minAmount: updatedDiscount.minAmount,
                    isActive: updatedDiscount.isActive,
                    maxUsages: updatedDiscount.maxUsages ? parseInt(updatedDiscount.maxUsages) : null,
                    expiryDate: updatedDiscount.expiryDate ? new Date(updatedDiscount.expiryDate) : null,
                }
            });
            // If prisma works, we still save to local for sync
        } catch (e) {
            console.warn("Prisma save failed, using local only");
        }

        // 2. Save to local JSON (Fallback)
        let discounts = getLocalDiscounts();
        const index = discounts.findIndex((d: any) => d.id === updatedDiscount.id);
        if (index !== -1) {
            discounts[index] = updatedDiscount;
        } else {
            discounts.unshift(updatedDiscount);
        }

        try {
            fs.writeFileSync(dbPath, JSON.stringify(discounts, null, 2));
        } catch (e) {
            // Ignored on Vercel read-only FS if needed
        }

        return NextResponse.json(updatedDiscount);
    } catch (error) {
        return NextResponse.json({ error: "Failed to save discount" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();

        try {
            await prisma.discountCode.delete({ where: { id } });
        } catch (e) { }

        let discounts = getLocalDiscounts();
        discounts = discounts.filter((d: any) => d.id !== id);
        try {
            fs.writeFileSync(dbPath, JSON.stringify(discounts, null, 2));
        } catch (e) { }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete discount" }, { status: 500 });
    }
}
