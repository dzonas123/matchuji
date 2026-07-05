import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        // Fetch all visits
        const totalVisits = await prisma.visit.count();
        
        // Calculate visits in the last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const visits30Days = await prisma.visit.count({
            where: {
                createdAt: {
                    gte: thirtyDaysAgo
                }
            }
        });
        
        return NextResponse.json({
            totalVisits,
            visits30Days
        });
    } catch (error) {
        console.error('Error fetching visits:', error);
        return NextResponse.json({ totalVisits: 0, visits30Days: 0 }, { status: 500 });
    }
}
