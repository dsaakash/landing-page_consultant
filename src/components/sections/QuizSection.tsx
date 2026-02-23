"use client";

import React, { useState, useCallback } from "react";
import { QUIZ_QUESTIONS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import styles from "./QuizSection.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type QuizAnswer = "yes" | "no" | null;
type Phase = "intro" | "questions" | "leadCapture" | "submitting" | "result";

interface QuizResultData {
    score: number;
    percent: number;
    label: string;
}

interface LeadFormData {
    name: string;
    email: string;
    phone: string;
    storeName: string;
    city: string;
    annualTurnover: string;
}

const TURNOVER_OPTIONS = [
    "Under ₹50L",
    "₹50L – ₹1Cr",
    "₹1Cr – ₹2Cr",
    "₹2Cr – ₹3Cr",
    "Above ₹3Cr",
];

// ─── Quiz Progress Bar ───────────────────────────────────────────────────────

function QuizProgress({ current, total }: { current: number; total: number }) {
    const progress = (current / total) * 100;
    return (
        <div className={styles.progressWrapper} role="progressbar" aria-valuenow={current} aria-valuemax={total}>
            <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
            <span className={styles.progressLabel}>Question {current} of {total}</span>
        </div>
    );
}

// ─── Single Question ──────────────────────────────────────────────────────────

function QuestionCard({
    question,
    onAnswer,
}: {
    question: (typeof QUIZ_QUESTIONS)[number];
    onAnswer: (answer: "yes" | "no") => void;
}) {
    return (
        <div className={styles.questionCard}>
            <p className={styles.questionText}>{question.text}</p>
            <div className={styles.answerGroup}>
                <button
                    id={`quiz-yes-${question.id}`}
                    className={`${styles.answerBtn} ${styles.yes}`}
                    onClick={() => onAnswer("yes")}
                    type="button"
                >
                    {question.yesLabel}
                </button>
                <button
                    id={`quiz-no-${question.id}`}
                    className={`${styles.answerBtn} ${styles.no}`}
                    onClick={() => onAnswer("no")}
                    type="button"
                >
                    {question.noLabel}
                </button>
            </div>
        </div>
    );
}

// ─── Lead Capture Form (mid-quiz) ─────────────────────────────────────────────

function LeadCaptureForm({
    onSubmit,
    isSubmitting,
    error,
}: {
    onSubmit: (data: LeadFormData) => void;
    isSubmitting: boolean;
    error: string;
}) {
    const [form, setForm] = useState<LeadFormData>({
        name: "",
        email: "",
        phone: "",
        storeName: "",
        city: "",
        annualTurnover: "",
    });

    const update = (key: keyof LeadFormData, val: string) =>
        setForm((prev) => ({ ...prev, [key]: val }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <div className={styles.captureCard}>
            <h3 className={styles.captureTitle}>Almost there — see your results.</h3>
            <p className={styles.captureSubtext}>
                Enter your details to receive your structural control score and a personalized diagnostic summary.
            </p>

            <form onSubmit={handleSubmit} className={styles.captureForm} noValidate>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="quiz-name" className={styles.formLabel}>Full Name *</label>
                        <input
                            id="quiz-name"
                            type="text"
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            className={styles.formInput}
                            placeholder="Your full name"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="quiz-phone" className={styles.formLabel}>Phone Number *</label>
                        <input
                            id="quiz-phone"
                            type="tel"
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            className={styles.formInput}
                            placeholder="+91 XXXXX XXXXX"
                            required
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="quiz-email" className={styles.formLabel}>Email Address *</label>
                    <input
                        id="quiz-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={styles.formInput}
                        placeholder="you@example.com"
                        required
                    />
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="quiz-store" className={styles.formLabel}>Store Name *</label>
                        <input
                            id="quiz-store"
                            type="text"
                            value={form.storeName}
                            onChange={(e) => update("storeName", e.target.value)}
                            className={styles.formInput}
                            placeholder="Your clothing store name"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="quiz-city" className={styles.formLabel}>City *</label>
                        <input
                            id="quiz-city"
                            type="text"
                            value={form.city}
                            onChange={(e) => update("city", e.target.value)}
                            className={styles.formInput}
                            placeholder="City"
                            required
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="quiz-turnover" className={styles.formLabel}>Annual Turnover *</label>
                    <select
                        id="quiz-turnover"
                        value={form.annualTurnover}
                        onChange={(e) => update("annualTurnover", e.target.value)}
                        className={styles.formSelect}
                        required
                    >
                        <option value="" disabled>Select your annual turnover</option>
                        {TURNOVER_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                {error && <p className={styles.formError}>{error}</p>}

                <button
                    id="quiz-submit-lead"
                    type="submit"
                    className={styles.formSubmitBtn}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Analyzing your store..." : "See My Control Score"}
                </button>

                <p className={styles.formDisclaimer}>
                    Your data is confidential and only used for diagnostic purposes.
                </p>
            </form>
        </div>
    );
}

// ─── Result Card ──────────────────────────────────────────────────────────────

function ResultCard({
    result,
    onReset,
}: {
    result: QuizResultData;
    onReset: () => void;
}) {
    const isHighRisk = result.score <= 2;
    const isModerate = result.score === 3 || result.score === 4;
    const resultClass = isHighRisk
        ? styles.resultHighRisk
        : isModerate
            ? styles.resultModerate
            : styles.resultStructured;

    const description = isHighRisk
        ? "Your store has significant structural control gaps. Stock mismatch is likely compounding silently every month."
        : isModerate
            ? "Some controls exist, but gaps remain. Partial structure is not the same as enforced structure."
            : "Your controls score well. A diagnostic can confirm whether your structure is audit-proof.";

    const ctaText = isHighRisk
        ? "Request Private Diagnostic — Understand Your Exact Exposure"
        : isModerate
            ? "Request Private Diagnostic — Close the Remaining Gaps"
            : "Request Private Diagnostic — Validate Your Control Architecture";

    return (
        <div className={`${styles.resultCard} ${resultClass}`}>
            <div className={styles.resultHeader}>
                <span className={styles.resultLabel}>{result.label}</span>
                <span className={styles.resultPercentage}>
                    Your store is operating at{" "}
                    <strong>{result.percent}% structural control.</strong>
                </span>
            </div>

            <div className={styles.scoreBar}>
                <div className={styles.scoreBarFill} style={{ width: `${result.percent}%` }} />
            </div>

            <p className={styles.resultDescription}>{description}</p>

            <div className={styles.resultCta}>
                <Button
                    id="quiz-result-cta"
                    variant="primary"
                    label={ctaText}
                    href="#diagnostic"
                    fullWidth
                />
                <button
                    id="quiz-reset"
                    className={styles.retakeBtn}
                    onClick={onReset}
                    type="button"
                >
                    Retake assessment
                </button>
            </div>
        </div>
    );
}

// ─── Main Quiz Section ───────────────────────────────────────────────────────

export function QuizSection() {
    const [phase, setPhase] = useState<Phase>("intro");
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<QuizAnswer[]>(
        Array(QUIZ_QUESTIONS.length).fill(null)
    );
    const [result, setResult] = useState<QuizResultData | null>(null);
    const [submitError, setSubmitError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAnswer = useCallback(
        (answer: QuizAnswer) => {
            const updated = [...answers];
            updated[currentStep] = answer;
            setAnswers(updated);

            if (currentStep < QUIZ_QUESTIONS.length - 1) {
                setCurrentStep((prev) => prev + 1);
            } else {
                // All questions answered → show lead capture
                setPhase("leadCapture");
            }
        },
        [answers, currentStep]
    );

    const handleLeadSubmit = async (data: LeadFormData) => {
        // Basic validation
        if (!data.name.trim() || !data.email.trim() || !data.phone.trim() || !data.storeName.trim() || !data.city.trim() || !data.annualTurnover) {
            setSubmitError("Please fill in all fields.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            setSubmitError("Please enter a valid email address.");
            return;
        }

        setSubmitError("");
        setIsSubmitting(true);
        setPhase("submitting");

        try {
            const payload = {
                ...data,
                answers: answers.map((a, i) => ({
                    questionId: QUIZ_QUESTIONS[i].id,
                    answer: a ?? "no",
                })),
            };

            const res = await fetch("/api/quiz/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const json = await res.json();

            if (!res.ok) {
                setSubmitError(json.error || "Submission failed.");
                setPhase("leadCapture");
                return;
            }

            setResult({
                score: json.score,
                percent: json.percent,
                label: json.label,
            });
            setPhase("result");
        } catch {
            setSubmitError("Network error. Please try again.");
            setPhase("leadCapture");
        } finally {
            setIsSubmitting(false);
        }
    };

    const reset = () => {
        setPhase("intro");
        setCurrentStep(0);
        setAnswers(Array(QUIZ_QUESTIONS.length).fill(null));
        setResult(null);
        setSubmitError("");
    };

    return (
        <SectionWrapper id="quiz" className={styles.section} narrow>
            <span className={styles.eyebrow}>Structural Assessment</span>
            <h2 className={styles.headline}>How Structurally Strong Is Your Store?</h2>
            <p className={styles.intro}>
                This is not a quiz. It is a five-point structural assessment of your store&apos;s control architecture.
            </p>

            {phase === "intro" && (
                <div className={styles.introCard}>
                    <p className={styles.introBody}>
                        Answer 5 questions about your store&apos;s current stock control practices.
                        Takes less than 2 minutes. Your results are confidential.
                    </p>
                    <Button
                        id="quiz-start"
                        variant="primary"
                        label="Start Assessment"
                        onClick={() => setPhase("questions")}
                    />
                </div>
            )}

            {phase === "questions" && (
                <>
                    <QuizProgress current={currentStep + 1} total={QUIZ_QUESTIONS.length} />
                    <QuestionCard
                        question={QUIZ_QUESTIONS[currentStep]}
                        onAnswer={handleAnswer}
                    />
                </>
            )}

            {(phase === "leadCapture" || phase === "submitting") && (
                <LeadCaptureForm
                    onSubmit={handleLeadSubmit}
                    isSubmitting={isSubmitting}
                    error={submitError}
                />
            )}

            {phase === "result" && result && (
                <ResultCard result={result} onReset={reset} />
            )}
        </SectionWrapper>
    );
}
