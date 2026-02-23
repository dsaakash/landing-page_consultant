// POST /api/auth/admin/login

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword, signAdminToken, setAdminCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required." },
                { status: 400 }
            );
        }

        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) {
            return NextResponse.json(
                { error: "Invalid credentials." },
                { status: 401 }
            );
        }

        const isValid = await verifyPassword(password, admin.password);
        if (!isValid) {
            return NextResponse.json(
                { error: "Invalid credentials." },
                { status: 401 }
            );
        }

        const token = await signAdminToken({
            id: admin.id,
            email: admin.email,
            role: admin.role,
        });

        await setAdminCookie(token);

        return NextResponse.json({
            success: true,
            admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
        });
    } catch (error) {
        console.error("[auth/admin/login]", error);
        return NextResponse.json({ error: "Login failed." }, { status: 500 });
    }
}
