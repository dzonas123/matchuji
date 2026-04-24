import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { status } = await req.json();
        const { id } = params;

        if (!status) {
            return NextResponse.json({ error: "Status is required" }, { status: 400 });
        }

        const updatedOrder = await prisma.order.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error("Failed to update order:", error);
        return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }
}
