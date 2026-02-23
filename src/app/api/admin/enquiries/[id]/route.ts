// GET /api/admin/enquiries/[id] — Full lead detail
// PATCH /api/admin/enquiries/[id] — Update status/stage

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/auth";
import { QUIZ_QUESTIONS } from "@/lib/constants";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: RouteParams) {
    const admin = await getAdminFromRequest(req);
    if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const { id } = await params;

    const lead = await prisma.lead.findUnique({
        where: { id },
        include: {
            notes: {
                include: { admin: { select: { name: true, email: true } } },
                orderBy: { createdAt: "desc" },
            },
            meetings: {
                include: { admin: { select: { name: true } } },
                orderBy: { createdAt: "desc" },
            },
        },
    });

    if (!lead) return NextResponse.json({ error: "Lead not found." }, { status: 404 });

    // Enrich quiz answers with question text
    const enrichedAnswers = Array.isArray(lead.quizAnswers)
        ? (lead.quizAnswers as Array<{ questionId: number; answer: string }>).map((a) => ({
            ...a,
            questionText:
                QUIZ_QUESTIONS.find((q) => q.id === a.questionId)?.text ?? "",
        }))
        : [];

    return NextResponse.json({ lead: { ...lead, enrichedAnswers } });
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
    const admin = await getAdminFromRequest(req);
    if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    const allowedFields = ["status", "stage"] as const;
    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
        if (body[field] !== undefined) updates[field] = body[field];
    }

    const lead = await prisma.lead.update({ where: { id }, data: updates });
    return NextResponse.json({ lead });
}
