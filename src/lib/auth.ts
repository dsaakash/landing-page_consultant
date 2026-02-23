// ─── Auth Utilities ────────────────────────────────────────────────────────────
// JWT-based authentication for admin and lead portal.
// Uses jose (pure JS, Edge-compatible) + bcryptjs for password hashing.

import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const SECRET = new TextEncoder().encode(
    process.env.AUTH_SECRET ?? "fallback-dev-secret"
);

const ADMIN_COOKIE = "rca_admin_token";
const LEAD_COOKIE = "rca_lead_token";

// ─── Password Utilities ───────────────────────────────────────────────────────

export async function hashPassword(plain: string): Promise<string> {
    return bcrypt.hash(plain, 12);
}

export async function verifyPassword(
    plain: string,
    hash: string
): Promise<boolean> {
    return bcrypt.compare(plain, hash);
}

// ─── JWT Utilities ────────────────────────────────────────────────────────────

export type AdminTokenPayload = {
    id: string;
    email: string;
    role: "SUPER_ADMIN" | "ADMIN";
    type: "admin";
};

export type LeadTokenPayload = {
    id: string;
    email: string;
    type: "lead";
};

export async function signAdminToken(
    payload: Omit<AdminTokenPayload, "type">
): Promise<string> {
    return new SignJWT({ ...payload, type: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("24h")
        .setIssuedAt()
        .sign(SECRET);
}

export async function signLeadToken(
    payload: Omit<LeadTokenPayload, "type">
): Promise<string> {
    return new SignJWT({ ...payload, type: "lead" })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d")
        .setIssuedAt()
        .sign(SECRET);
}

export async function verifyToken(
    token: string
): Promise<AdminTokenPayload | LeadTokenPayload | null> {
    try {
        const { payload } = await jwtVerify(token, SECRET);
        return payload as AdminTokenPayload | LeadTokenPayload;
    } catch {
        return null;
    }
}

// ─── Cookie Helpers (Server Components / Route Handlers) ─────────────────────

export async function getAdminFromRequest(
    req: NextRequest
): Promise<AdminTokenPayload | null> {
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    if (!token) return null;
    const payload = await verifyToken(token);
    if (!payload || payload.type !== "admin") return null;
    return payload as AdminTokenPayload;
}

export async function getLeadFromRequest(
    req: NextRequest
): Promise<LeadTokenPayload | null> {
    const token = req.cookies.get(LEAD_COOKIE)?.value;
    if (!token) return null;
    const payload = await verifyToken(token);
    if (!payload || payload.type !== "lead") return null;
    return payload as LeadTokenPayload;
}

export async function setAdminCookie(token: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 24 * 60 * 60,
    });
}

export async function setLeadCookie(token: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(LEAD_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
    });
}

export async function clearAdminCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_COOKIE);
}

export async function clearLeadCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(LEAD_COOKIE);
}

export async function getAdminSession(): Promise<AdminTokenPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE)?.value;
    if (!token) return null;
    const payload = await verifyToken(token);
    if (!payload || payload.type !== "admin") return null;
    return payload as AdminTokenPayload;
}

export async function getLeadSession(): Promise<LeadTokenPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(LEAD_COOKIE)?.value;
    if (!token) return null;
    const payload = await verifyToken(token);
    if (!payload || payload.type !== "lead") return null;
    return payload as LeadTokenPayload;
}

export { ADMIN_COOKIE, LEAD_COOKIE };
