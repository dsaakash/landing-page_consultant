"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface LeadSummary {
    id: string;
    name: string;
    email: string;
    phone: string;
    storeName: string;
    city: string;
    annualTurnover: string;
    quizScore: number;
    quizPercent: number;
    quizLabel: string;
    status: string;
    stage: string;
    portalEnabled: boolean;
    createdAt: string;
    _count: { notes: number; meetings: number };
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

// ─── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
    const classMap: Record<string, string> = {
        NEW: styles.badgeNew,
        CONTACTED: styles.badgeContacted,
        QUALIFIED: styles.badgeQualified,
        CONVERTED: styles.badgeConverted,
        REJECTED: styles.badgeRejected,
    };
    return (
        <span className={`${styles.badge} ${classMap[status] ?? ""}`}>
            {status}
        </span>
    );
}

// ─── Score Bar (Mini) ──────────────────────────────────────────────────────────

function ScoreBar({ percent, label }: { percent: number; label: string }) {
    const isHigh = percent <= 40;
    const isMod = percent > 40 && percent < 100;
    const barClass = isHigh ? styles.scoreBarHigh : isMod ? styles.scoreBarMod : styles.scoreBarGood;
    return (
        <div className={styles.scoreWrap}>
            <div className={styles.scoreTrack}>
                <div className={`${styles.scoreFill} ${barClass}`} style={{ width: `${percent}%` }} />
            </div>
            <span className={styles.scoreLabel}>{percent}% — {label}</span>
        </div>
    );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
    const router = useRouter();
    const [leads, setLeads] = useState<LeadSummary[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        page: 1, limit: 20, total: 0, totalPages: 0,
    });
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchLeads = useCallback(async (page = 1) => {
        setLoading(true);
        const params = new URLSearchParams({ page: String(page), limit: "20" });
        if (search) params.set("search", search);
        if (statusFilter) params.set("status", statusFilter);

        const res = await fetch(`/api/admin/enquiries?${params}`);
        if (res.status === 401) {
            router.push("/admin/login");
            return;
        }
        const data = await res.json();
        setLeads(data.leads);
        setPagination(data.pagination);
        setLoading(false);
    }, [search, statusFilter, router]);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchLeads(1);
    };

    const handleLogout = async () => {
        await fetch("/api/auth/admin/logout", { method: "POST" });
        router.push("/admin/login");
    };

    return (
        <div className={styles.page}>
            {/* Top Bar */}
            <header className={styles.topBar}>
                <div className={styles.topInner}>
                    <h1 className={styles.topTitle}>Enquiries Dashboard</h1>
                    <div className={styles.topRight}>
                        <span className={styles.topBrand}>Retail Control Architect</span>
                        <button id="admin-logout" onClick={handleLogout} className={styles.logoutBtn} type="button">
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            {/* Filters */}
            <div className={styles.filtersBar}>
                <div className={styles.filtersInner}>
                    <form onSubmit={handleSearch} className={styles.searchForm}>
                        <input
                            id="enquiry-search"
                            type="text"
                            placeholder="Search by name, email, store, city..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={styles.searchInput}
                        />
                        <button type="submit" className={styles.searchBtn}>Search</button>
                    </form>
                    <select
                        id="status-filter"
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); }}
                        className={styles.filterSelect}
                    >
                        <option value="">All Statuses</option>
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="QUALIFIED">Qualified</option>
                        <option value="CONVERTED">Converted</option>
                        <option value="REJECTED">Rejected</option>
                    </select>
                    <span className={styles.totalCount}>
                        {pagination.total} enquir{pagination.total === 1 ? "y" : "ies"}
                    </span>
                </div>
            </div>

            {/* Table */}
            <main className={styles.main}>
                {loading ? (
                    <div className={styles.loading}>Loading enquiries...</div>
                ) : leads.length === 0 ? (
                    <div className={styles.empty}>
                        <p>No enquiries found.</p>
                        <p className={styles.emptyHint}>Enquiries will appear here when visitors complete the quiz.</p>
                    </div>
                ) : (
                    <div className={styles.tableWrap}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className={styles.th}>Name / Store</th>
                                    <th className={styles.th}>Contact</th>
                                    <th className={styles.th}>Control Score</th>
                                    <th className={styles.th}>Status</th>
                                    <th className={styles.th}>Date</th>
                                    <th className={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead) => (
                                    <tr key={lead.id} className={styles.row}>
                                        <td className={styles.td}>
                                            <div className={styles.nameCell}>
                                                <strong className={styles.leadName}>{lead.name}</strong>
                                                <span className={styles.storeName}>{lead.storeName}, {lead.city}</span>
                                                <span className={styles.turnover}>{lead.annualTurnover}</span>
                                            </div>
                                        </td>
                                        <td className={styles.td}>
                                            <div className={styles.contactCell}>
                                                <span>{lead.email}</span>
                                                <span className={styles.phone}>{lead.phone}</span>
                                            </div>
                                        </td>
                                        <td className={styles.td}>
                                            <ScoreBar percent={lead.quizPercent} label={lead.quizLabel} />
                                        </td>
                                        <td className={styles.td}>
                                            <StatusBadge status={lead.status} />
                                        </td>
                                        <td className={styles.td}>
                                            <span className={styles.dateText}>
                                                {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                                                    day: "2-digit", month: "short", year: "numeric",
                                                })}
                                            </span>
                                        </td>
                                        <td className={styles.td}>
                                            <div className={styles.actionCell}>
                                                <a
                                                    href={`/admin/enquiries/${lead.id}`}
                                                    className={styles.viewBtn}
                                                >
                                                    View Details
                                                </a>
                                                {lead._count.notes > 0 && (
                                                    <span className={styles.noteBadge}>{lead._count.notes} note{lead._count.notes > 1 ? "s" : ""}</span>
                                                )}
                                                {lead.portalEnabled && (
                                                    <span className={styles.portalBadge}>Portal Active</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            disabled={pagination.page <= 1}
                            onClick={() => fetchLeads(pagination.page - 1)}
                            className={styles.pageBtn}
                            type="button"
                        >
                            Previous
                        </button>
                        <span className={styles.pageInfo}>
                            Page {pagination.page} of {pagination.totalPages}
                        </span>
                        <button
                            disabled={pagination.page >= pagination.totalPages}
                            onClick={() => fetchLeads(pagination.page + 1)}
                            className={styles.pageBtn}
                            type="button"
                        >
                            Next
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
