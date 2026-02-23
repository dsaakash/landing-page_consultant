// POST /api/admin/enquiries/[id]/meetings — Assign meeting link to lead
// GET  /api/admin/enquiries/[id]/meetings — List all meetings for a lead

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/auth";

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: RouteParams) {
    const admin = await getAdminFromRequest(req);
    if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const { id } = await params;
    const { meetingLink, title, scheduledAt, notes } = await req.json();

    if (!meetingLink) {
        return NextResponse.json({ error: "Meeting link is required." }, { status: 400 });
    }

    const meeting = await prisma.meeting.create({
        data: {
            leadId: id,
            adminId: admin.id,
            meetingLink,
            title: title ?? "Stock Control Diagnostic Call",
            scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
            notes: notes ?? null,
        },
    });

    return NextResponse.json({ meeting }, { status: 201 });
}

export async function GET(req: NextRequest, { params }: RouteParams) {
    const admin = await getAdminFromRequest(req);
    if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const { id } = await params;

    const meetings = await prisma.meeting.findMany({
        where: { leadId: id },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ meetings });
}
