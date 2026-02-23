// GET /api/admin/enquiries — List all leads with filters + pagination
// POST /api/admin/enquiries — Not used (leads created via quiz)

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
    const admin = await getAdminFromRequest(req);
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.min(50, parseInt(searchParams.get("limit") ?? "20"));
    const status = searchParams.get("status") ?? undefined;
    const stage = searchParams.get("stage") ?? undefined;
    const search = searchParams.get("search") ?? "";

    const where = {
        ...(status ? { status: status as never } : {}),
        ...(stage ? { stage: stage as never } : {}),
        ...(search
            ? {
                OR: [
                    { name: { contains: search, mode: "insensitive" as const } },
                    { email: { contains: search, mode: "insensitive" as const } },
                    { storeName: { contains: search, mode: "insensitive" as const } },
                    { city: { contains: search, mode: "insensitive" as const } },
                ],
            }
            : {}),
    };

    const [leads, total] = await Promise.all([
        prisma.lead.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * limit,
            take: limit,
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                storeName: true,
                city: true,
                annualTurnover: true,
                quizScore: true,
                quizPercent: true,
                quizLabel: true,
                status: true,
                stage: true,
                portalEnabled: true,
                createdAt: true,
                _count: { select: { notes: true, meetings: true } },
            },
        }),
        prisma.lead.count({ where }),
    ]);

    return NextResponse.json({
        leads,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    });
}
