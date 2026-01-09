import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const prisma = new PrismaClient({
    accelerateUrl: process.env.PRISMA_DATABASE_URL
});

async function main() {
    console.log('🚀 Creating a test order with Zásilkovna...');

    // Find the next Variable Symbol
    const startVS = 202500003;
    const lastOrder = await prisma.order.findFirst({
        orderBy: { variableSymbol: 'desc' }
    });

    let nextVS = startVS.toString();
    if (lastOrder && lastOrder.variableSymbol) {
        const lastVSNum = parseInt(lastOrder.variableSymbol);
        if (lastVSNum >= startVS) {
            nextVS = (lastVSNum + 1).toString();
        }
    }

    const testOrder = await prisma.order.create({
        data: {
            id: `test_session_${Math.random().toString(36).substring(7)}`,
            variableSymbol: nextVS,
            date: new Date(),
            amount: 490 + 79, // Product + Zasilkovna
            status: 'paid',
            carrier: 'Zásilkovna - Výdejní místa',
            zasilkovna_branch_id: '12345',
            shipping: {
                firstName: 'Jan',
                lastName: 'Testovací',
                email: 'jan.test@example.cz',
                phone: '+420777123456',
                address: 'Výdejní místo AlzaBox',
                city: 'Praha',
                postalCode: '11000',
                country: 'Česká republika',
                zasilkovna_id: '12345',
                zasilkovna_name: 'Zásilkovna - AlzaBox Hlavní'
            },
            items: [
                {
                    id: 'matcha-50g',
                    name: 'Ceremoniální Matcha 50g',
                    price: 490,
                    quantity: 1,
                    sku: 'MATCHA-50-CER',
                    ean: '2000000000015'
                }
            ]
        }
    });

    console.log('✅ Test order created successfully!');
    console.log('Order ID:', testOrder.id);
    console.log('Variable Symbol:', testOrder.variableSymbol);
}

main()
    .catch((e) => {
        console.error('❌ Error creating test order:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
