// POST /api/auth/lead/logout

import { NextResponse } from "next/server";
import { clearLeadCookie } from "@/lib/auth";

export async function POST() {
    await clearLeadCookie();
    return NextResponse.json({ success: true });
}
