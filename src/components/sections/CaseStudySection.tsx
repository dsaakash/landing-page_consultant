"use client";

import React, { useState } from "react";
import { CASE_STUDY } from "@/lib/constants";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import styles from "./CaseStudySection.module.css";

// ─── Email Capture (SRP) ─────────────────────────────────────────────────────

function EmailCapture() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const validate = (value: string): boolean =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        setError("");
        setSubmitted(true);
        // NOTE: Integrate with email service (Mailchimp, ConvertKit, etc.) here
        console.info("[EmailCapture] Case study requested by:", email);
    };

    if (submitted) {
        return (
            <div className={styles.captureSuccess}>
                <span className={styles.successIcon}>✓</span>
                <p>The full case study has been sent to <strong>{email}</strong>.</p>
            </div>
        );
    }

    return (
        <form className={styles.captureForm} onSubmit={handleSubmit} noValidate>
            <label htmlFor="case-study-email" className={styles.captureLabel}>
                Download Full Case Study
            </label>
            <p className={styles.captureNote}>Enter your email to receive the complete Lalitha Garments implementation report.</p>
            <div className={styles.captureInputRow}>
                <input
                    id="case-study-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={styles.captureInput}
                    autoComplete="email"
                    required
                />
                <button id="case-study-submit" type="submit" className={styles.captureBtn}>
                    Send Case Study
                </button>
            </div>
            {error && <p className={styles.captureError}>{error}</p>}
        </form>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CaseStudySection() {
    return (
        <SectionWrapper id="case-study" className={styles.section}>
            <span className={styles.eyebrow}>Implementation Evidence</span>
            <h2 className={styles.headline}>{CASE_STUDY.storeName}</h2>
            <p className={styles.subline}>
                A single-store clothing retailer. ₹3.2L in stock exposure identified and
                resolved within 45 days.
            </p>

            <div className={styles.comparison}>
                <div className={styles.column}>
                    <span className={styles.columnLabel}>Before</span>
                    <div className={styles.metricsGrid}>
                        {CASE_STUDY.beforeMetrics.map((m) => (
                            <MetricCard key={m.label} value={m.value} label={m.label} />
                        ))}
                    </div>
                </div>

                <div className={styles.arrow} aria-hidden="true">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                    <span>45 days</span>
                </div>

                <div className={styles.column}>
                    <span className={`${styles.columnLabel} ${styles.columnLabelAfter}`}>
                        After
                    </span>
                    <div className={styles.metricsGrid}>
                        {CASE_STUDY.afterMetrics.map((m) => (
                            <MetricCard key={m.label} value={m.value} label={m.label} accent />
                        ))}
                    </div>
                </div>
            </div>

            <blockquote className={styles.quote}>
                <p className={styles.quoteText}>&ldquo;{CASE_STUDY.quote}&rdquo;</p>
                <cite className={styles.quoteAttr}>{CASE_STUDY.quoteAttr}</cite>
            </blockquote>

            <EmailCapture />
        </SectionWrapper>
    );
}
