import React from "react";
import { AUDIT_OPTIONS, BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import styles from "./AuditSection.module.css";

export function AuditSection() {
    return (
        <SectionWrapper id="diagnostic" className={styles.section} narrow>
            <span className={styles.eyebrow}>Start Here</span>
            <h2 className={styles.headline}>Choose Your Entry Point.</h2>
            <p className={styles.subheadline}>
                Two paths to begin. Both require serious intent.
            </p>

            <div className={styles.optionList}>
                {AUDIT_OPTIONS.map((option) => (
                    <div
                        key={option.id}
                        className={`${styles.optionCard} ${option.isPrimary ? styles.optionPrimary : ""}`}
                        aria-label={option.title}
                    >
                        <div className={styles.optionHeader}>
                            <div>
                                <span className={styles.optionLabel}>
                                    {option.isPrimary ? "Recommended" : "Alternative"}
                                </span>
                                <h3 className={styles.optionTitle}>{option.title}</h3>
                            </div>
                            <span className={styles.optionPrice}>{option.price}</span>
                        </div>

                        <p className={styles.optionDescription}>{option.description}</p>

                        <div className={styles.optionNote}>
                            <span className={styles.noteIcon} aria-hidden="true">◆</span>
                            <span>{option.note}</span>
                        </div>

                        <Button
                            id={`audit-cta-${option.id}`}
                            variant={option.isPrimary ? "primary" : "secondary"}
                            label={option.isPrimary ? "Book Private Diagnostic" : "Apply for Free Audit"}
                            href={BRAND.calendly}
                        />
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
