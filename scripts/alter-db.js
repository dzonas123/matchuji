const { PrismaClient } = require('@prisma/client');

async function main() {
  const fs = require('fs');
  const dotenv = require('dotenv');

  const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }

  const prisma = new PrismaClient();
  try {
    console.log('Adding column via raw SQL...');
    await prisma.$executeRawUnsafe('ALTER TABLE "Order" ADD COLUMN "zasilkovna_tracking_number" TEXT;');
    console.log('Success!');
  } catch (e) {
    console.error('Failed or already exists', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
