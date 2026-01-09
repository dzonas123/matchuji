import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const prisma = new PrismaClient({
    accelerateUrl: process.env.PRISMA_DATABASE_URL
});


async function main() {
    console.log('Updating product matcha-50g...');

    const product = await prisma.product.upsert({
        where: { id: 'matcha-50g' },
        update: {
            ean: '2000000000015',
            sku: 'MATCHA-50-CER',
            weight_g: 50,
            name: 'Ceremoniální Matcha 50g'
        },
        create: {
            id: 'matcha-50g',
            name: 'Ceremoniální Matcha 50g',
            price: 490, // Default if not exists
            stock: 100,
            ean: '2000000000015',
            sku: 'MATCHA-50-CER',
            weight_g: 50,
        },
    });

    console.log('✅ Product updated:', product);
}

main()
    .catch((e) => {
        console.error('❌ Error updating product:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
