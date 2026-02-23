"use client";

import React from "react";
import { usePathname } from "next/navigation";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
    const pathname = usePathname();

    // Hide header on admin/portal pages (they have their own layouts)
    if (pathname.startsWith("/admin") || pathname.startsWith("/portal")) {
        return null;
    }

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <span className={styles.brand}>Retail Control Architect</span>
                <a id="header-login-btn" href="/admin/login" className={styles.loginLink}>
                    Login
                </a>
            </div>
        </header>
    );
}
