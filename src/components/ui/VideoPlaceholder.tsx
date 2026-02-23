import React from "react";
import type { VideoPlaceholderProps } from "@/lib/types";
import styles from "./VideoPlaceholder.module.css";

// ─── Video URL Parser (Strategy Pattern) ──────────────────────────────────────

function getYouTubeId(url: string): string | null {
    const match = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match?.[1] ?? null;
}

function getVimeoId(url: string): string | null {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match?.[1] ?? null;
}

function getLoomId(url: string): string | null {
    const match = url.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/);
    return match?.[1] ?? null;
}

function isDirectVideo(url: string): boolean {
    return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

export function VideoPlaceholder({
    title = "Private Stock Control Diagnostic — Watch Before Applying",
    subtitle = "This is not a sales video. It is a structured assessment of how retail stock control failures happen.",
    videoUrl = "",
}: VideoPlaceholderProps) {
    // ─── YouTube Embed ───────────────────────────────────────────────────────────
    const ytId = videoUrl ? getYouTubeId(videoUrl) : null;
    if (ytId) {
        return (
            <div className={styles.embedWrapper}>
                <iframe
                    className={styles.iframe}
                    src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                />
            </div>
        );
    }

    // ─── Vimeo Embed ─────────────────────────────────────────────────────────────
    const vimeoId = videoUrl ? getVimeoId(videoUrl) : null;
    if (vimeoId) {
        return (
            <div className={styles.embedWrapper}>
                <iframe
                    className={styles.iframe}
                    src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
                    title={title}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                />
            </div>
        );
    }

    // ─── Loom Embed ──────────────────────────────────────────────────────────────
    const loomId = videoUrl ? getLoomId(videoUrl) : null;
    if (loomId) {
        return (
            <div className={styles.embedWrapper}>
                <iframe
                    className={styles.iframe}
                    src={`https://www.loom.com/embed/${loomId}?hide_owner=true&hide_share=true`}
                    title={title}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    loading="lazy"
                />
            </div>
        );
    }

    // ─── Direct Video (.mp4, .webm) ──────────────────────────────────────────────
    if (videoUrl && isDirectVideo(videoUrl)) {
        return (
            <div className={styles.wrapper}>
                <video
                    className={styles.video}
                    src={videoUrl}
                    controls
                    preload="metadata"
                    playsInline
                >
                    <track kind="captions" />
                    Your browser does not support the video tag.
                </video>
            </div>
        );
    }

    // ─── Placeholder (Default — no URL) ──────────────────────────────────────────
    return (
        <div className={styles.wrapper} role="img" aria-label="Video placeholder">
            <div className={styles.inner}>
                <div className={styles.playButton} aria-hidden="true">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <polygon points="5,3 19,12 5,21" fill="currentColor" />
                    </svg>
                </div>
                <p className={styles.title}>{title}</p>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>
        </div>
    );
}
