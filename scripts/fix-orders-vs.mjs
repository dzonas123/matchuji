import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const prisma = new PrismaClient({
    accelerateUrl: process.env.PRISMA_DATABASE_URL
});

async function fixOrders() {
    console.log('🔍 Checking orders for missing Variable Symbols...');

    const orders = await prisma.order.findMany({
        orderBy: { date: 'asc' }
    });

    console.log(`📝 Total orders found: ${orders.length}`);

    let nextVS = 202500003;

    for (const order of orders) {
        if (!order.variableSymbol) {
            console.log(`✅ Updating Order ${order.id} with VS ${nextVS}`);
            await prisma.order.update({
                where: { id: order.id },
                data: { variableSymbol: String(nextVS) }
            });
            nextVS++;
        } else {
            const currentVS = parseInt(order.variableSymbol);
            if (!isNaN(currentVS) && currentVS >= nextVS) {
                nextVS = currentVS + 1;
            }
        }
    }

    console.log('🏁 Finished fixing orders!');
}

fixOrders()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
