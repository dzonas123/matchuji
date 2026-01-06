import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
    console.log('🚀 Starting migration to Supabase...');

    // 1. Migrate Products
    const productsPath = path.join(process.cwd(), 'src/data/products.json');
    if (fs.existsSync(productsPath)) {
        const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
        console.log(`📦 Migrating ${products.length} products...`);
        const { error } = await supabase.from('products').upsert(products);
        if (error) console.error('❌ Error migrating products:', error);
        else console.log('✅ Products migrated successfully.');
    }

    // 2. Migrate Orders
    const ordersPath = path.join(process.cwd(), 'src/data/orders.json');
    if (fs.existsSync(ordersPath)) {
        const orders = JSON.parse(fs.readFileSync(ordersPath, 'utf-8'));
        console.log(`📝 Migrating ${orders.length} orders...`);
        const { error } = await supabase.from('orders').upsert(orders);
        if (error) console.error('❌ Error migrating orders:', error);
        else console.log('✅ Orders migrated successfully.');
    }

    console.log('🏁 Migration finished!');
}

migrate();
