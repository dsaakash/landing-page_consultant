import React from "react";
import { SCARCITY } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import styles from "./ScarcitySection.module.css";

export function ScarcitySection() {
    return (
        <SectionWrapper id="availability" className={styles.section} narrow>
            <span className={styles.eyebrow}>Availability</span>
            <h2 className={styles.headline}>{SCARCITY.headline}</h2>

            <ul className={styles.points} role="list">
                {SCARCITY.points.map((point, i) => (
                    <li key={i} className={styles.point}>
                        <span className={styles.bullet} aria-hidden="true">—</span>
                        <span>{point}</span>
                    </li>
                ))}
            </ul>

            <p className={styles.note}>{SCARCITY.note}</p>
        </SectionWrapper>
    );
}
