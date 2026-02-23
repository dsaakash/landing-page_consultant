import React from "react";
import type { ButtonProps } from "@/lib/types";
import styles from "./Button.module.css";

// ─── Variant Strategy (Strategy Pattern) ─────────────────────────────────────

const variantClassMap: Record<ButtonProps["variant"], string> = {
    primary: styles.primary,
    secondary: styles.secondary,
    ghost: styles.ghost,
};

export function Button({
    variant,
    label,
    href,
    onClick,
    fullWidth = false,
    small = false,
    id,
}: ButtonProps) {
    const className = [
        styles.base,
        variantClassMap[variant],
        fullWidth ? styles.fullWidth : "",
        small ? styles.small : "",
    ]
        .filter(Boolean)
        .join(" ");

    if (href) {
        return (
            <a
                id={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
            >
                {label}
            </a>
        );
    }

    return (
        <button id={id} className={className} onClick={onClick} type="button">
            {label}
        </button>
    );
}
