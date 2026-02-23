import React from "react";
import { PRICING_OPTIONS, BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import styles from "./PricingSection.module.css";

export function PricingSection() {
    return (
        <SectionWrapper id="investment" className={styles.section}>
            <span className={styles.eyebrow}>Investment</span>
            <h2 className={styles.headline}>Structured Implementation.</h2>
            <p className={styles.subheadline}>
                Clear pricing. No negotiation. No ambiguity.
            </p>

            <div className={styles.grid}>
                {PRICING_OPTIONS.map((option) => (
                    <article
                        key={option.id}
                        className={`${styles.card} ${option.isPrimary ? styles.cardPrimary : ""}`}
                        aria-label={option.title}
                    >
                        {option.tag && (
                            <div className={styles.tag}>{option.tag}</div>
                        )}

                        <div className={styles.cardBody}>
                            <h3 className={styles.optionTitle}>{option.title}</h3>
                            <div className={styles.priceRow}>
                                <span className={styles.price}>{option.price}</span>
                            </div>
                            <p className={styles.subtext}>{option.subtext}</p>

                            <ul className={styles.features} role="list">
                                {option.features.map((feature) => (
                                    <li key={feature} className={styles.feature}>
                                        <span className={styles.featureIcon} aria-hidden="true">—</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.cardFooter}>
                            <Button
                                id={`pricing-cta-${option.id}`}
                                variant={option.isPrimary ? "primary" : "secondary"}
                                label="Apply for This Window"
                                href={BRAND.calendly}
                                fullWidth
                            />
                        </div>
                    </article>
                ))}
            </div>

            <p className={styles.footerNote}>
                Implementation includes Performance Guarantee. Founding window closes permanently once 2 stores are filled.
            </p>
        </SectionWrapper>
    );
}
