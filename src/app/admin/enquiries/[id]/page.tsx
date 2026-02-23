"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "./detail.module.css";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface EnrichedAnswer { questionId: number; answer: string; questionText: string; }
interface Note { id: string; content: string; createdAt: string; admin: { name: string; email: string }; }
interface Meeting { id: string; title: string; meetingLink: string; scheduledAt: string | null; notes: string | null; status: string; createdAt: string; admin: { name: string }; }
interface LeadDetail {
    id: string; name: string; email: string; phone: string; storeName: string;
    city: string; annualTurnover: string; quizScore: number; quizPercent: number;
    quizLabel: string; status: string; stage: string; portalEnabled: boolean;
    portalEmail: string | null; createdAt: string; enrichedAnswers: EnrichedAnswer[];
    notes: Note[]; meetings: Meeting[];
}

const STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "REJECTED"];
const STAGES = ["ENQUIRY", "DIAGNOSTIC_SCHEDULED", "DIAGNOSTIC_DONE", "PROPOSAL_SENT", "ONBOARDED", "COMPLETED"];

export default function EnquiryDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [lead, setLead] = useState<LeadDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [noteText, setNoteText] = useState("");
    const [noteLoading, setNoteLoading] = useState(false);

    // Meeting form
    const [meetLink, setMeetLink] = useState("");
    const [meetTitle, setMeetTitle] = useState("Stock Control Diagnostic Call");
    const [meetDate, setMeetDate] = useState("");
    const [meetNotes, setMeetNotes] = useState("");
    const [meetLoading, setMeetLoading] = useState(false);

    // Credentials form
    const [credEmail, setCredEmail] = useState("");
    const [credPassword, setCredPassword] = useState("");
    const [credLoading, setCredLoading] = useState(false);
    const [credMsg, setCredMsg] = useState("");

    // Status update
    const [statusUpdating, setStatusUpdating] = useState(false);

    const fetchLead = useCallback(async () => {
        const res = await fetch(`/api/admin/enquiries/${id}`);
        if (res.status === 401) { router.push("/admin/login"); return; }
        if (!res.ok) { router.push("/admin/dashboard"); return; }
        const data = await res.json();
        setLead(data.lead);
        setLoading(false);
    }, [id, router]);

    useEffect(() => { fetchLead(); }, [fetchLead]);

    // ─── Actions ───────────────────────────────────────────────────────────────

    const addNote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!noteText.trim()) return;
        setNoteLoading(true);
        await fetch(`/api/admin/enquiries/${id}/notes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: noteText }),
        });
        setNoteText("");
        setNoteLoading(false);
        fetchLead();
    };

    const addMeeting = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!meetLink.trim()) return;
        setMeetLoading(true);
        await fetch(`/api/admin/enquiries/${id}/meetings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ meetingLink: meetLink, title: meetTitle, scheduledAt: meetDate || null, notes: meetNotes || null }),
        });
        setMeetLink(""); setMeetTitle("Stock Control Diagnostic Call"); setMeetDate(""); setMeetNotes("");
        setMeetLoading(false);
        fetchLead();
    };

    const createCredentials = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!credEmail.trim() || !credPassword.trim()) { setCredMsg("Both fields are required."); return; }
        if (credPassword.length < 8) { setCredMsg("Password must be at least 8 characters."); return; }
        setCredLoading(true); setCredMsg("");
        const res = await fetch(`/api/admin/enquiries/${id}/credentials`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ portalEmail: credEmail, portalPassword: credPassword }),
        });
        const data = await res.json();
        if (!res.ok) { setCredMsg(data.error); } else { setCredMsg(`✓ Portal enabled for ${data.portalEmail}`); }
        setCredLoading(false);
        fetchLead();
    };

    const updateField = async (field: string, value: string) => {
        setStatusUpdating(true);
        await fetch(`/api/admin/enquiries/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ [field]: value }),
        });
        setStatusUpdating(false);
        fetchLead();
    };

    if (loading || !lead) {
        return <div className={styles.page}><div className={styles.loading}>Loading...</div></div>;
    }

    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.topBar}>
                <div className={styles.topInner}>
                    <div className={styles.topLeft}>
                        <a href="/admin/dashboard" className={styles.backBtn}>← Back to Enquiries</a>
                    </div>
                    <span className={styles.topBrand}>Retail Control Architect</span>
                </div>
            </header>

            <main className={styles.main}>
                {/* Lead Header */}
                <div className={styles.leadHeader}>
                    <div>
                        <h1 className={styles.leadName}>{lead.name}</h1>
                        <p className={styles.leadMeta}>{lead.storeName} · {lead.city} · {lead.annualTurnover}</p>
                        <p className={styles.leadDate}>Enquired {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</p>
                    </div>
                    <div className={styles.statusGroup}>
                        <div className={styles.selectGroup}>
                            <label className={styles.selectLabel}>Status</label>
                            <select value={lead.status} onChange={(e) => updateField("status", e.target.value)} disabled={statusUpdating} className={styles.select}>
                                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className={styles.selectGroup}>
                            <label className={styles.selectLabel}>Stage</label>
                            <select value={lead.stage} onChange={(e) => updateField("stage", e.target.value)} disabled={statusUpdating} className={styles.select}>
                                {STAGES.map(s => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className={styles.grid}>
                    {/* Left Column */}
                    <div className={styles.leftCol}>
                        {/* Contact Info */}
                        <section className={styles.card}>
                            <h2 className={styles.cardTitle}>Contact Information</h2>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}><span className={styles.infoLabel}>Email</span><span>{lead.email}</span></div>
                                <div className={styles.infoItem}><span className={styles.infoLabel}>Phone</span><span>{lead.phone}</span></div>
                                <div className={styles.infoItem}><span className={styles.infoLabel}>Store</span><span>{lead.storeName}</span></div>
                                <div className={styles.infoItem}><span className={styles.infoLabel}>City</span><span>{lead.city}</span></div>
                                <div className={styles.infoItem}><span className={styles.infoLabel}>Turnover</span><span>{lead.annualTurnover}</span></div>
                            </div>
                        </section>

                        {/* Quiz Results */}
                        <section className={styles.card}>
                            <h2 className={styles.cardTitle}>Quiz Results — {lead.quizPercent}% ({lead.quizLabel})</h2>
                            <div className={styles.quizBar}>
                                <div className={styles.quizBarFill} style={{ width: `${lead.quizPercent}%`, background: lead.quizScore <= 2 ? "#c0392b" : lead.quizScore <= 4 ? "#d4811f" : "var(--color-green)" }} />
                            </div>
                            <div className={styles.answersList}>
                                {lead.enrichedAnswers.map((a, i) => (
                                    <div key={i} className={styles.answerItem}>
                                        <span className={styles.answerQ}>{a.questionText}</span>
                                        <span className={`${styles.answerA} ${a.answer === "yes" ? styles.answerYes : styles.answerNo}`}>
                                            {a.answer === "yes" ? "✓ Yes" : "✗ No"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Meetings */}
                        <section className={styles.card}>
                            <h2 className={styles.cardTitle}>Meetings</h2>
                            {lead.meetings.length > 0 && (
                                <div className={styles.meetingsList}>
                                    {lead.meetings.map(m => (
                                        <div key={m.id} className={styles.meetingItem}>
                                            <div className={styles.meetingTop}>
                                                <strong>{m.title}</strong>
                                                <span className={styles.meetingStatus}>{m.status}</span>
                                            </div>
                                            <a href={m.meetingLink} target="_blank" rel="noopener noreferrer" className={styles.meetingLink}>{m.meetingLink}</a>
                                            {m.scheduledAt && <span className={styles.meetingDate}>Scheduled: {new Date(m.scheduledAt).toLocaleDateString("en-IN")}</span>}
                                            {m.notes && <p className={styles.meetingNote}>{m.notes}</p>}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <form onSubmit={addMeeting} className={styles.meetingForm}>
                                <input value={meetTitle} onChange={(e) => setMeetTitle(e.target.value)} className={styles.formInput} placeholder="Meeting title" />
                                <input value={meetLink} onChange={(e) => setMeetLink(e.target.value)} className={styles.formInput} placeholder="Meeting URL (Google Meet, Zoom, etc.)" required />
                                <input type="datetime-local" value={meetDate} onChange={(e) => setMeetDate(e.target.value)} className={styles.formInput} />
                                <textarea value={meetNotes} onChange={(e) => setMeetNotes(e.target.value)} className={styles.formTextarea} placeholder="Optional notes..." rows={2} />
                                <button type="submit" className={styles.actionBtn} disabled={meetLoading}>
                                    {meetLoading ? "Adding..." : "Add Meeting"}
                                </button>
                            </form>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className={styles.rightCol}>
                        {/* Notes */}
                        <section className={styles.card}>
                            <h2 className={styles.cardTitle}>Notes ({lead.notes.length})</h2>
                            <form onSubmit={addNote} className={styles.noteForm}>
                                <textarea
                                    id="note-input"
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                    className={styles.formTextarea}
                                    placeholder="Add a note about this lead..."
                                    rows={3}
                                />
                                <button type="submit" className={styles.actionBtn} disabled={noteLoading}>
                                    {noteLoading ? "Adding..." : "Add Note"}
                                </button>
                            </form>
                            {lead.notes.length > 0 && (
                                <div className={styles.notesList}>
                                    {lead.notes.map(n => (
                                        <div key={n.id} className={styles.noteItem}>
                                            <div className={styles.noteTop}>
                                                <strong>{n.admin.name}</strong>
                                                <span className={styles.noteDate}>{new Date(n.createdAt).toLocaleDateString("en-IN")}</span>
                                            </div>
                                            <p className={styles.noteContent}>{n.content}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Portal Credentials */}
                        <section className={styles.card}>
                            <h2 className={styles.cardTitle}>Client Portal Access</h2>
                            {lead.portalEnabled ? (
                                <div className={styles.portalActive}>
                                    <span className={styles.portalIcon}>✓</span>
                                    Portal active for: <strong>{lead.portalEmail}</strong>
                                </div>
                            ) : (
                                <p className={styles.portalInactive}>No portal access yet. Create credentials to allow this lead to view their meetings.</p>
                            )}
                            <form onSubmit={createCredentials} className={styles.credForm}>
                                <input value={credEmail} onChange={(e) => setCredEmail(e.target.value)} type="email" className={styles.formInput} placeholder="Portal login email" required />
                                <input value={credPassword} onChange={(e) => setCredPassword(e.target.value)} type="text" className={styles.formInput} placeholder="Portal password (min 8 chars)" required />
                                {credMsg && <p className={credMsg.startsWith("✓") ? styles.credSuccess : styles.credError}>{credMsg}</p>}
                                <button type="submit" className={styles.actionBtn} disabled={credLoading}>
                                    {credLoading ? "Creating..." : lead.portalEnabled ? "Update Credentials" : "Create Portal Access"}
                                </button>
                            </form>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
