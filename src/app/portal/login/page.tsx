"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./portal-login.module.css";

export default function PortalLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/lead/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) { setError(data.error || "Login failed."); return; }
            router.push("/portal/dashboard");
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Client Portal</h1>
                    <p className={styles.subtitle}>Retail Control Architect</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                    <div className={styles.field}>
                        <label htmlFor="portal-email" className={styles.label}>Email</label>
                        <input id="portal-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} placeholder="your@email.com" autoComplete="email" required />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="portal-password" className={styles.label}>Password</label>
                        <input id="portal-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} placeholder="••••••••" autoComplete="current-password" required />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button id="portal-login-submit" type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className={styles.footer}>
                    <a href="/" className={styles.backLink}>← Back to website</a>
                    <p className={styles.footerNote}>Credentials provided by your advisor.</p>
                </div>
            </div>
        </div>
    );
}
