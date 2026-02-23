import React from "react";
import { FRAMEWORK_STEPS, FRAMEWORK_TAGLINE } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import styles from "./FrameworkSection.module.css";

export function FrameworkSection() {
    return (
        <SectionWrapper id="framework" className={styles.section}>
            <div className={styles.header}>
                <span className={styles.eyebrow}>The Model</span>
                <h2 className={styles.headline}>
                    Retail Control Architecture Model
                </h2>
                <p className={styles.subheadline}>
                    Five structural layers. Installed in sequence. Measured at each stage.
                </p>
            </div>

            <ol className={styles.stepList} role="list">
                {FRAMEWORK_STEPS.map((step, index) => (
                    <li key={step.number} className={styles.step}>
                        <div className={styles.stepNumber} aria-hidden="true">
                            {step.number}
                        </div>
                        <div className={styles.stepContent}>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDescription}>{step.description}</p>
                        </div>
                        {index < FRAMEWORK_STEPS.length - 1 && (
                            <div className={styles.connector} aria-hidden="true" />
                        )}
                    </li>
                ))}
            </ol>

            <p className={styles.tagline}>{FRAMEWORK_TAGLINE}</p>
        </SectionWrapper>
    );
}
