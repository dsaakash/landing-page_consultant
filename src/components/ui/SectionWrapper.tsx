import React from "react";
import type { SectionWrapperProps } from "@/lib/types";
import styles from "./SectionWrapper.module.css";

export function SectionWrapper({
    id,
    children,
    className = "",
    narrow = false,
}: SectionWrapperProps) {
    return (
        <section id={id} className={`${styles.section} ${className}`}>
            <div className={`${styles.container} ${narrow ? styles.narrow : ""}`}>
                {children}
            </div>
        </section>
    );
}
