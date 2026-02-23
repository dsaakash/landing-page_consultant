// ─── Domain Types ────────────────────────────────────────────────────────────

export interface QuizQuestion {
    id: number;
    text: string;
    yesLabel: string;
    noLabel: string;
}

export type QuizAnswer = "yes" | "no" | null;

export interface QuizResult {
    score: number;
    percentage: number;
    label: string;
    description: string;
    ctaText: string;
}

export interface MetricItem {
    before: string;
    after: string;
    label: string;
}

export interface CaseStudyData {
    storeName: string;
    beforeMetrics: CaseStudyMetric[];
    afterMetrics: CaseStudyMetric[];
    quote: string;
    quoteAttr: string;
}

export interface CaseStudyMetric {
    value: string;
    label: string;
}

export interface RoiRow {
    mismatch: string;
    annual: string;
    fiveYear: string;
}

export interface FrameworkStep {
    number: string;
    title: string;
    description: string;
}

export interface PricingOption {
    id: string;
    tag?: string;
    title: string;
    price: string;
    subtext: string;
    features: string[];
    isPrimary: boolean;
}

export interface AuditOption {
    id: string;
    title: string;
    price: string;
    description: string;
    note: string;
    isPrimary: boolean;
}

export interface PainPoint {
    metric: string;
    description: string;
}

// ─── Component Props ─────────────────────────────────────────────────────────

export interface ButtonProps {
    variant: "primary" | "secondary" | "ghost";
    label: string;
    href?: string;
    onClick?: () => void;
    fullWidth?: boolean;
    small?: boolean;
    id?: string;
}

export interface SectionWrapperProps {
    id: string;
    children: React.ReactNode;
    className?: string;
    narrow?: boolean;
}

export interface MetricCardProps {
    value: string;
    label: string;
    accent?: boolean;
}

export interface VideoPlaceholderProps {
    title?: string;
    subtitle?: string;
    videoUrl?: string;
}
