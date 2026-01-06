import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config({ path: '.env.local' });

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrate() {
    console.log('🚀 Starting migration to Prisma Postgres...');

    // 1. Migrate Products
    const productsPath = path.join(process.cwd(), 'src/data/products.json');
    if (fs.existsSync(productsPath)) {
        const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
        console.log(`📦 Migrating ${products.length} products...`);

        for (const product of products) {
            await prisma.product.upsert({
                where: { id: product.id },
                update: {
                    name: product.name,
                    price: product.price,
                    stock: product.stock,
                    image: product.image,
                },
                create: {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    stock: product.stock,
                    image: product.image,
                },
            });
        }
        console.log('✅ Products migrated successfully.');
    }

    // 2. Migrate Orders
    const ordersPath = path.join(process.cwd(), 'src/data/orders.json');
    if (fs.existsSync(ordersPath)) {
        const orders = JSON.parse(fs.readFileSync(ordersPath, 'utf-8'));
        console.log(`📝 Migrating ${orders.length} orders...`);

        for (const order of orders) {
            await prisma.order.upsert({
                where: { id: order.id },
                update: {
                    date: new Date(order.date),
                    amount: order.amount,
                    status: order.status,
                    carrier: order.carrier,
                    shipping: order.shipping,
                    items: order.items,
                },
                create: {
                    id: order.id,
                    date: new Date(order.date),
                    amount: order.amount,
                    status: order.status,
                    carrier: order.carrier,
                    shipping: order.shipping,
                    items: order.items,
                },
            });
        }
        console.log('✅ Orders migrated successfully.');
    }

    console.log('🏁 Migration finished!');
}

migrate()
    .catch((e) => {
        console.error('❌ Migration failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
