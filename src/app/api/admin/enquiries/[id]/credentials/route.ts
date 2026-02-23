// POST /api/admin/enquiries/[id]/credentials — Create lead portal credentials

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest, hashPassword } from "@/lib/auth";

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: RouteParams) {
    const admin = await getAdminFromRequest(req);
    if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const { id } = await params;
    const { portalEmail, portalPassword } = await req.json();

    if (!portalEmail || !portalPassword) {
        return NextResponse.json(
            { error: "Portal email and password are required." },
            { status: 400 }
        );
    }

    if (portalPassword.length < 8) {
        return NextResponse.json(
            { error: "Password must be at least 8 characters." },
            { status: 400 }
        );
    }

    const hashedPassword = await hashPassword(portalPassword);

    const lead = await prisma.lead.update({
        where: { id },
        data: {
            portalEmail,
            portalPassword: hashedPassword,
            portalEnabled: true,
        },
    });

    return NextResponse.json({
        success: true,
        portalEmail: lead.portalEmail,
    });
}
