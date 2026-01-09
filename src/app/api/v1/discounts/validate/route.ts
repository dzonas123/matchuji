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

export async function POST(req: Request) {
    try {
        const { code, cartAmount } = await req.json();

        if (!code) {
            return NextResponse.json({ error: "Kód nebyl zadán" }, { status: 400 });
        }

        let discount = null;

        // 1. Try Prisma
        try {
            discount = await prisma.discountCode.findUnique({
                where: { code: code.toUpperCase() }
            });
        } catch (dbError) {
            console.warn("Prisma validation failed, using local fallback");
        }

        // 2. Try Local
        if (!discount) {
            const localDiscounts = getLocalDiscounts();
            discount = localDiscounts.find((d: any) => d.code === code.toUpperCase());
        }

        if (!discount || !discount.isActive) {
            return NextResponse.json({ error: "Slevový kód neexistuje nebo je neplatný" }, { status: 404 });
        }

        // Check expiry
        const expiry = discount.expiryDate ? new Date(discount.expiryDate) : null;
        if (expiry && expiry < new Date()) {
            return NextResponse.json({ error: "Slevový kód vypršel" }, { status: 400 });
        }

        // Check max usages
        if (discount.maxUsages && discount.usageCount >= discount.maxUsages) {
            return NextResponse.json({ error: "Slevový kód již byl vyčerpán" }, { status: 400 });
        }

        // Check min amount
        if (discount.minAmount && cartAmount < discount.minAmount) {
            return NextResponse.json({
                error: `Slevový kód vyžaduje minimální objednávku v hodnotě ${discount.minAmount} Kč`
            }, { status: 400 });
        }

        let discountAmount = 0;
        if (discount.type === 'percentage') {
            discountAmount = (cartAmount * discount.value) / 100;
        } else {
            discountAmount = discount.value;
        }

        return NextResponse.json({
            success: true,
            code: discount.code,
            type: discount.type,
            value: discount.value,
            amount: Math.round(discountAmount)
        });

    } catch (error) {
        console.error("Error validating discount code:", error);
        return NextResponse.json({ error: "Chyba při ověřování kódu" }, { status: 500 });
    }
}
