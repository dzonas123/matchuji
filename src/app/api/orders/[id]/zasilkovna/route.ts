import { NextResponse } from "next/server";
import { createZasilkovnaShipment, getZasilkovnaLabelPdf } from "@/lib/zasilkovna";
import { prisma } from "@/lib/prisma";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const result = await createZasilkovnaShipment(id);

        if (result.success) {
            return NextResponse.json({
                success: true,
                barcode: result.barcode,
                id: result.id
            });
        } else {
            return NextResponse.json({
                success: false,
                error: result.error
            }, { status: 400 });
        }
    } catch (err: any) {
        console.error("Zasilkovna creation endpoint error:", err);
        return NextResponse.json({
            success: false,
            error: err.message || "Selhalo vytvoření zásilky."
        }, { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const order = await prisma.order.findUnique({
            where: { id }
        });

        if (!order || !order.zasilkovna_tracking_number) {
            return NextResponse.json({ error: "Sledovací číslo nebylo u této objednávky nalezeno." }, { status: 404 });
        }

        const pdfBuffer = await getZasilkovnaLabelPdf(order.zasilkovna_tracking_number);

        if (!pdfBuffer) {
            return NextResponse.json({ error: "Nepodařilo se stáhnout štítek ze Zásilkovny." }, { status: 500 });
        }

        return new Response(new Uint8Array(pdfBuffer), {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `inline; filename="stitek-zasilkovna-${order.zasilkovna_tracking_number}.pdf"`
            }
        });

    } catch (err: any) {
        console.error("Zasilkovna label download endpoint error:", err);
        return NextResponse.json({ error: err.message || "Chyba stahování štítku." }, { status: 500 });
    }
}
