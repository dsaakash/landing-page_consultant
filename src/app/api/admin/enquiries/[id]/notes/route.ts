// POST /api/admin/enquiries/[id]/notes — Add a note to an enquiry

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/auth";

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: RouteParams) {
    const admin = await getAdminFromRequest(req);
    if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const { id } = await params;
    const { content } = await req.json();

    if (!content?.trim()) {
        return NextResponse.json({ error: "Note content is required." }, { status: 400 });
    }

    const note = await prisma.enquiryNote.create({
        data: { content: content.trim(), leadId: id, adminId: admin.id },
        include: { admin: { select: { name: true, email: true } } },
    });

    return NextResponse.json({ note }, { status: 201 });
}

export async function GET(req: NextRequest, { params }: RouteParams) {
    const admin = await getAdminFromRequest(req);
    if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const { id } = await params;

    const notes = await prisma.enquiryNote.findMany({
        where: { leadId: id },
        include: { admin: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ notes });
}
