import React from "react";
import { PAIN_POINTS, PAIN_TAGLINE } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import styles from "./HiddenRealitySection.module.css";

export function HiddenRealitySection() {
    return (
        <SectionWrapper id="hidden-reality">
            <div className={styles.grid}>
                <div className={styles.left}>
                    <span className={styles.eyebrow}>The Hidden Reality</span>
                    <h2 className={styles.headline}>
                        What the Numbers Don&apos;t Show Until It&apos;s Too Late.
                    </h2>
                    <p className={styles.body}>
                        Single-store clothing retail operates with some of the highest stock
                        mismatch rates of any retail category. Most store owners discover
                        the extent of the damage only at year-end — long after the erosion
                        has compounded.
                    </p>
                    <p className={styles.tagline}>{PAIN_TAGLINE}</p>
                </div>

                <div className={styles.right}>
                    <ul className={styles.painList} role="list">
                        {PAIN_POINTS.map((point) => (
                            <li key={point.metric} className={styles.painItem}>
                                <span className={styles.metric}>{point.metric}</span>
                                <span className={styles.description}>{point.description}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </SectionWrapper>
    );
}
