import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const url = process.env.PRISMA_DATABASE_URL || process.env.DATABASE_URL || "";
const isAccelerate = url.startsWith('prisma://') || url.startsWith('prisma+postgres://');

export const prisma =
    globalForPrisma.prisma ||
    (isAccelerate
        ? new PrismaClient({ accelerateUrl: url })
        : new PrismaClient());

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
