// POST /api/auth/lead/login

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword, signLeadToken, setLeadCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required." },
                { status: 400 }
            );
        }

        const lead = await prisma.lead.findUnique({ where: { portalEmail: email } });
        if (!lead || !lead.portalEnabled || !lead.portalPassword) {
            return NextResponse.json(
                { error: "No portal access found for this email. Contact your advisor." },
                { status: 401 }
            );
        }

        const isValid = await verifyPassword(password, lead.portalPassword);
        if (!isValid) {
            return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
        }

        const token = await signLeadToken({ id: lead.id, email: lead.portalEmail! });
        await setLeadCookie(token);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[auth/lead/login]", error);
        return NextResponse.json({ error: "Login failed." }, { status: 500 });
    }
}
