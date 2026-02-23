import React from "react";
import type { MetricCardProps } from "@/lib/types";
import styles from "./MetricCard.module.css";

export function MetricCard({ value, label, accent = false }: MetricCardProps) {
    return (
        <div className={`${styles.card} ${accent ? styles.accent : ""}`}>
            <span className={styles.value}>{value}</span>
            <span className={styles.label}>{label}</span>
        </div>
    );
}
