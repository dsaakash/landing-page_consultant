"use client";

import { useState, useCallback } from "react";
import { QUIZ_QUESTIONS, QUIZ_RESULTS } from "@/lib/constants";
import type { QuizAnswer, QuizResult } from "@/lib/types";

// ─── Interface (Dependency Inversion) ────────────────────────────────────────

interface UseQuizReturn {
    currentStep: number;
    answers: QuizAnswer[];
    result: QuizResult | null;
    isComplete: boolean;
    totalQuestions: number;
    progress: number;
    handleAnswer: (answer: QuizAnswer) => void;
    reset: () => void;
}

// ─── Score Resolver (Single Responsibility) ───────────────────────────────────

function resolveResult(score: number): QuizResult {
    const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);

    if (score <= 2) {
        return {
            score,
            percentage,
            label: QUIZ_RESULTS.highRisk.label,
            description: QUIZ_RESULTS.highRisk.description,
            ctaText: QUIZ_RESULTS.highRisk.ctaText,
        };
    }

    if (score <= 4) {
        return {
            score,
            percentage,
            label: QUIZ_RESULTS.moderateRisk.label,
            description: QUIZ_RESULTS.moderateRisk.description,
            ctaText: QUIZ_RESULTS.moderateRisk.ctaText,
        };
    }

    return {
        score,
        percentage: 100,
        label: QUIZ_RESULTS.structured.label,
        description: QUIZ_RESULTS.structured.description,
        ctaText: QUIZ_RESULTS.structured.ctaText,
    };
}

// ─── Score Counter (Single Responsibility) ────────────────────────────────────

function computeScore(answers: QuizAnswer[]): number {
    return answers.filter((a) => a === "yes").length;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useQuiz(): UseQuizReturn {
    const total = QUIZ_QUESTIONS.length;
    const [answers, setAnswers] = useState<QuizAnswer[]>(Array(total).fill(null));
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [result, setResult] = useState<QuizResult | null>(null);

    const handleAnswer = useCallback(
        (answer: QuizAnswer) => {
            const updated = [...answers];
            updated[currentStep] = answer;
            setAnswers(updated);

            if (currentStep < total - 1) {
                setCurrentStep((prev) => prev + 1);
            } else {
                const score = computeScore(updated);
                setResult(resolveResult(score));
            }
        },
        [answers, currentStep, total]
    );

    const reset = useCallback(() => {
        setAnswers(Array(total).fill(null));
        setCurrentStep(0);
        setResult(null);
    }, [total]);

    const isComplete = result !== null;
    const progress = ((currentStep) / total) * 100;

    return {
        currentStep,
        answers,
        result,
        isComplete,
        totalQuestions: total,
        progress,
        handleAnswer,
        reset,
    };
}
