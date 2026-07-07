import { prisma } from "./prisma";

const PACKETA_API_KEY = process.env.PACKETA_API_KEY || "e1146aa1641a90e";
const PACKETA_API_PASSWORD = process.env.PACKETA_API_PASSWORD || "de1146aa1641a90e19a37bb4aa6b84aa";
const PACKETA_SENDER_ID = process.env.PACKETA_SENDER_ID || "540317";
const PACKETA_ESHOP_NAME = process.env.PACKETA_ESHOP_NAME || "Matchuji.cz";
const PACKETA_API_URL = "https://www.zasilkovna.cz/api/rest";

function formatPhone(phone: string): string {
    // Remove all whitespace
    let cleaned = phone.replace(/\s+/g, "");
    
    // If it starts with "+", keep it
    if (cleaned.startsWith("+")) {
        return cleaned;
    }
    
    // If it starts with "00", replace with "+"
    if (cleaned.startsWith("00")) {
        return "+" + cleaned.slice(2);
    }
    
    // If it has 9 digits, prefix with +420 (Czech default)
    if (cleaned.length === 9) {
        return "+420" + cleaned;
    }
    
    // If it starts with "420" and has 12 digits, prefix with "+"
    if (cleaned.startsWith("420") && cleaned.length === 12) {
        return "+" + cleaned;
    }
    
    return cleaned;
}

function parseAddress(fullAddress: string) {
    // A regex to separate street and number, e.g. "Vinohrady 794/45" -> street: "Vinohrady", houseNumber: "794/45"
    const match = fullAddress.trim().match(/^(.+?)\s+(\d+.*)$/);
    if (match) {
        return { street: match[1], houseNumber: match[2] };
    }
    return { street: fullAddress, houseNumber: "" };
}

export interface CreateShipmentResult {
    success: boolean;
    barcode?: string;
    id?: string;
    error?: string;
}

export async function createZasilkovnaShipment(orderId: string): Promise<CreateShipmentResult> {
    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            return { success: false, error: "Objednávka nebyla nalezena." };
        }

        const shipping = order.shipping as any;
        if (!shipping) {
            return { success: false, error: "Chybí doručovací údaje u objednávky." };
        }

        const isHomeDelivery = order.carrier?.toLowerCase().includes("adresa") || false;
        
        let addressId = "";
        if (isHomeDelivery) {
            addressId = "106"; // CZ Zásilkovna domů HD
        } else {
            addressId = order.zasilkovna_branch_id || shipping.zasilkovna_id || "";
            if (!addressId) {
                return { success: false, error: "Pro výdejní místo chybí vybraná pobočka Zásilkovny." };
            }
        }

        const firstName = shipping.firstName || "";
        const lastName = shipping.lastName || "";
        const email = shipping.email || "";
        const phone = formatPhone(shipping.phone || "");
        const orderNumber = order.variableSymbol || order.id.slice(-6).toUpperCase();
        const value = order.amount || 0;
        
        // Split street and house number for home delivery
        const { street, houseNumber } = parseAddress(shipping.address || "");
        const city = shipping.city || "";
        const zip = (shipping.postalCode || shipping.zip || "").replace(/\s+/g, "");

        let xml = `<?xml version="1.0" encoding="utf-8"?>
<createPacket>
    <apiPassword>${PACKETA_API_PASSWORD}</apiPassword>
    <packetAttributes>
        <number>${orderNumber}</number>
        <name>${firstName}</name>
        <surname>${lastName}</surname>
        <email>${email}</email>
        <phone>${phone}</phone>
        <addressId>${addressId}</addressId>
        <weight>0.25</weight>
        <value>${value}</value>
        <currency>CZK</currency>
        <eshop>${PACKETA_ESHOP_NAME}</eshop>`;

        if (isHomeDelivery) {
            xml += `
        <street>${street}</street>
        <houseNumber>${houseNumber}</houseNumber>
        <city>${city}</city>
        <zip>${zip}</zip>`;
        }

        xml += `
    </packetAttributes>
</createPacket>`;

        console.log("Sending XML to Zasilkovna:", xml);

        const response = await fetch(PACKETA_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/xml"
            },
            body: xml
        });

        const responseText = await response.text();
        console.log("Zasilkovna Response:", responseText);

        const statusMatch = responseText.match(/<status>(.*?)<\/status>/);
        const status = statusMatch ? statusMatch[1] : "";

        if (status === "ok") {
            const barcodeMatch = responseText.match(/<barcode>(.*?)<\/barcode>/);
            const barcode = barcodeMatch ? barcodeMatch[1] : "";
            const idMatch = responseText.match(/<id>(.*?)<\/id>/);
            const id = idMatch ? idMatch[1] : "";

            // Update order in database with tracking number
            await prisma.order.update({
                where: { id: orderId },
                data: {
                    zasilkovna_tracking_number: barcode
                }
            });

            return { success: true, barcode, id };
        } else {
            const errorMatch = responseText.match(/<string>(.*?)<\/string>/) || responseText.match(/<message>(.*?)<\/message>/);
            const error = errorMatch ? errorMatch[1] : "Neznámá chyba při komunikaci se Zásilkovnou.";
            return { success: false, error };
        }

    } catch (err: any) {
        console.error("Zasilkovna API Error:", err);
        return { success: false, error: err.message || "Selhalo připojení k Zásilkovně." };
    }
}

export async function getZasilkovnaLabelPdf(barcode: string): Promise<Buffer | null> {
    try {
        const xml = `<?xml version="1.0" encoding="utf-8"?>
<packetLabelPdf>
    <apiPassword>${PACKETA_API_PASSWORD}</apiPassword>
    <packetId>${barcode}</packetId>
    <format>A6 on A6</format>
    <offset>0</offset>
</packetLabelPdf>`;

        const response = await fetch(PACKETA_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/xml"
            },
            body: xml
        });

        const responseText = await response.text();
        const statusMatch = responseText.match(/<status>(.*?)<\/status>/);
        const status = statusMatch ? statusMatch[1] : "";

        if (status === "ok") {
            const resultMatch = responseText.match(/<result>(.*?)<\/result>/s);
            if (resultMatch) {
                const base64Pdf = resultMatch[1].trim();
                return Buffer.from(base64Pdf, "base64");
            }
        }
        return null;
    } catch (err) {
        console.error("Failed to fetch Zasilkovna label PDF:", err);
        return null;
    }
}
