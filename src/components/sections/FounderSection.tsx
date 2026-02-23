import React from "react";
import { FOUNDER } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import styles from "./FounderSection.module.css";

export function FounderSection() {
    return (
        <SectionWrapper id="founder" narrow>
            <div className={styles.header}>
                <span className={styles.eyebrow}>The Founder</span>
                <h2 className={styles.headline}>{FOUNDER.headline}</h2>
            </div>

            <div className={styles.content}>
                {FOUNDER.paragraphs.map((para, i) => (
                    <p key={i} className={styles.paragraph}>
                        {para}
                    </p>
                ))}
                <p className={styles.closing}>{FOUNDER.closing}</p>
            </div>
        </SectionWrapper>
    );
}
