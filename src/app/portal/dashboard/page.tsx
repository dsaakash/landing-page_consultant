"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./portal-dashboard.module.css";

interface Meeting {
    id: string;
    title: string;
    meetingLink: string;
    scheduledAt: string | null;
    notes: string | null;
    status: string;
    createdAt: string;
}

interface LeadMe {
    id: string;
    name: string;
    email: string;
    storeName: string;
    city: string;
    quizScore: number;
    quizPercent: number;
    quizLabel: string;
    status: string;
    stage: string;
    meetings: Meeting[];
}

export default function PortalDashboardPage() {
    const router = useRouter();
    const [lead, setLead] = useState<LeadMe | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/portal/me");
            if (res.status === 401) { router.push("/portal/login"); return; }
            const data = await res.json();
            setLead(data.lead);
            setLoading(false);
        })();
    }, [router]);

    const handleLogout = async () => {
        await fetch("/api/auth/lead/logout", { method: "POST" });
        router.push("/portal/login");
    };

    if (loading || !lead) {
        return <div className={styles.page}><div className={styles.loading}>Loading your portal...</div></div>;
    }

    const stageName = lead.stage.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c: string) => c.toUpperCase());

    return (
        <div className={styles.page}>
            <header className={styles.topBar}>
                <div className={styles.topInner}>
                    <div>
                        <h1 className={styles.topTitle}>Client Portal</h1>
                        <span className={styles.topBrand}>Retail Control Architect</span>
                    </div>
                    <button onClick={handleLogout} className={styles.logoutBtn} type="button">Sign Out</button>
                </div>
            </header>

            <main className={styles.main}>
                {/* Welcome */}
                <div className={styles.welcome}>
                    <h2 className={styles.welcomeName}>Welcome, {lead.name}.</h2>
                    <p className={styles.welcomeMeta}>{lead.storeName} · {lead.city}</p>
                </div>

                <div className={styles.grid}>
                    {/* Stage Card */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Your Stage</h3>
                        <div className={styles.stageRow}>
                            <span className={styles.stageBadge}>{stageName}</span>
                        </div>
                        <p className={styles.stageNote}>Your implementation journey is tracked here. Contact your advisor for status updates.</p>
                    </div>

                    {/* Score Card */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Control Score</h3>
                        <div className={styles.scoreDisplay}>
                            <span className={styles.scoreBig}>{lead.quizPercent}%</span>
                            <span className={styles.scoreLabel}>{lead.quizLabel}</span>
                        </div>
                        <div className={styles.scoreBar}>
                            <div className={styles.scoreBarFill} style={{ width: `${lead.quizPercent}%`, background: lead.quizScore <= 2 ? "#c0392b" : lead.quizScore <= 4 ? "#d4811f" : "var(--color-green)" }} />
                        </div>
                    </div>
                </div>

                {/* Meetings */}
                <section className={styles.meetingsSection}>
                    <h3 className={styles.cardTitle}>Your Meetings</h3>
                    {lead.meetings.length === 0 ? (
                        <div className={styles.noMeetings}>
                            <p>No meetings scheduled yet.</p>
                            <p className={styles.noMeetingsHint}>Your advisor will assign meetings here once your diagnostic is complete.</p>
                        </div>
                    ) : (
                        <div className={styles.meetingsList}>
                            {lead.meetings.map(m => (
                                <div key={m.id} className={styles.meetingCard}>
                                    <div className={styles.meetingHeader}>
                                        <h4 className={styles.meetingTitle}>{m.title}</h4>
                                        <span className={styles.meetingStatus}>{m.status}</span>
                                    </div>
                                    {m.scheduledAt && (
                                        <p className={styles.meetingDate}>
                                            📅 {new Date(m.scheduledAt).toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
                                            {" at "}
                                            {new Date(m.scheduledAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                                        </p>
                                    )}
                                    <a href={m.meetingLink} target="_blank" rel="noopener noreferrer" className={styles.joinBtn}>
                                        Join Meeting →
                                    </a>
                                    {m.notes && <p className={styles.meetingNote}>{m.notes}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
