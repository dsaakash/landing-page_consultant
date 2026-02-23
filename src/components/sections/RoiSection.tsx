import React from "react";
import { ROI_ROWS, ROI_TAGLINE, ROI_BASE } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import styles from "./RoiSection.module.css";

export function RoiSection() {
    return (
        <SectionWrapper id="roi" className={styles.section} narrow>
            <span className={styles.eyebrow}>Return on Structure</span>
            <h2 className={styles.headline}>The Cost of Not Controlling.</h2>
            <p className={styles.baseNote}>{ROI_BASE}</p>

            <div className={styles.tableWrapper}>
                <table className={styles.table} aria-label="ROI breakdown table">
                    <thead>
                        <tr>
                            <th scope="col" className={styles.th}>
                                Mismatch Rate
                            </th>
                            <th scope="col" className={styles.th}>
                                Annual Erosion
                            </th>
                            <th scope="col" className={styles.th}>
                                5-Year Erosion
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {ROI_ROWS.map((row, i) => (
                            <tr key={row.mismatch} className={i % 2 === 1 ? styles.rowAlt : ""}>
                                <td className={styles.td}>
                                    <span className={styles.mismatchBadge}>{row.mismatch}</span>
                                </td>
                                <td className={styles.td}>{row.annual}</td>
                                <td className={`${styles.td} ${styles.tdFiveYear}`}>
                                    {row.fiveYear}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.mathNote}>
                <p>
                    These are not projections. They are arithmetic. At ₹1 Crore turnover,
                    a 5% mismatch is ₹5 lakh annually — ₹25 lakh over five years —
                    leaving your store through gaps in structure. Not in sales. Not in
                    market. In control.
                </p>
            </div>

            <p className={styles.tagline}>{ROI_TAGLINE}</p>
        </SectionWrapper>
    );
}
