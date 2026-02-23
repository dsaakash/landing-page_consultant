// POST /api/quiz/submit
// Receives lead contact info + quiz answers. Stores in DB.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { QUIZ_QUESTIONS } from "@/lib/constants";

// ─── Validator (Single Responsibility) ───────────────────────────────────────

function validateSubmission(body: unknown): string | null {
    if (!body || typeof body !== "object") return "Invalid request body.";
    const b = body as Record<string, unknown>;
    if (!b.name || typeof b.name !== "string") return "Name is required.";
    if (!b.email || typeof b.email !== "string") return "Email is required.";
    if (!b.phone || typeof b.phone !== "string") return "Phone is required.";
    if (!b.storeName || typeof b.storeName !== "string") return "Store name is required.";
    if (!b.city || typeof b.city !== "string") return "City is required.";
    if (!b.annualTurnover || typeof b.annualTurnover !== "string") return "Annual turnover is required.";
    if (!Array.isArray(b.answers)) return "Quiz answers are required.";
    if (b.answers.length !== QUIZ_QUESTIONS.length) return "Incomplete quiz answers.";
    return null;
}

// ─── Score Resolver (Single Responsibility) ───────────────────────────────────

function resolveLabel(score: number): string {
    if (score <= 2) return "High Leakage Risk";
    if (score <= 4) return "Moderate Risk";
    return "Structured Control";
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const validationError = validateSubmission(body);
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 });
        }

        const { name, email, phone, storeName, city, annualTurnover, answers } = body as {
            name: string;
            email: string;
            phone: string;
            storeName: string;
            city: string;
            annualTurnover: string;
            answers: Array<{ questionId: number; answer: "yes" | "no" }>;
        };

        const score = answers.filter((a) => a.answer === "yes").length;
        const percent = Math.round((score / QUIZ_QUESTIONS.length) * 100);
        const label = resolveLabel(score);

        // Upsert — allows re-submission by same email (updates data)
        const lead = await prisma.lead.upsert({
            where: { email },
            update: {
                name,
                phone,
                storeName,
                city,
                annualTurnover,
                quizScore: score,
                quizPercent: percent,
                quizLabel: label,
                quizAnswers: answers,
                status: "NEW",
            },
            create: {
                name,
                email,
                phone,
                storeName,
                city,
                annualTurnover,
                quizScore: score,
                quizPercent: percent,
                quizLabel: label,
                quizAnswers: answers,
            },
        });

        return NextResponse.json(
            {
                success: true,
                leadId: lead.id,
                score,
                percent,
                label,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("[quiz/submit]", error);
        return NextResponse.json(
            { error: "Submission failed. Please try again." },
            { status: 500 }
        );
    }
}
