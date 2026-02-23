// GET /api/portal/me — Returns lead's own data + meetings (for portal dashboard)

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getLeadFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
    const session = await getLeadFromRequest(req);
    if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const lead = await prisma.lead.findUnique({
        where: { id: session.id },
        select: {
            id: true,
            name: true,
            email: true,
            storeName: true,
            city: true,
            quizScore: true,
            quizPercent: true,
            quizLabel: true,
            status: true,
            stage: true,
            meetings: {
                where: { status: { not: "CANCELLED" } },
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    title: true,
                    meetingLink: true,
                    scheduledAt: true,
                    notes: true,
                    status: true,
                    createdAt: true,
                },
            },
        },
    });

    if (!lead) return NextResponse.json({ error: "Not found." }, { status: 404 });

    return NextResponse.json({ lead });
}
