import React from "react";
import { GUARANTEE } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import styles from "./GuaranteeSection.module.css";

export function GuaranteeSection() {
    return (
        <SectionWrapper id="guarantee" narrow>
            <div className={styles.card}>
                <div className={styles.icon} aria-hidden="true">◆</div>
                <span className={styles.eyebrow}>Performance Guarantee</span>
                <h2 className={styles.headline}>{GUARANTEE.headline}</h2>
                <p className={styles.body}>{GUARANTEE.body}</p>
                <p className={styles.note}>{GUARANTEE.note}</p>
            </div>
        </SectionWrapper>
    );
}
