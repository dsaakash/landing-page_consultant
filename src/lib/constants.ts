import type {
    QuizQuestion,
    CaseStudyData,
    RoiRow,
    FrameworkStep,
    PricingOption,
    AuditOption,
    PainPoint,
} from "./types";

// ─── Brand ───────────────────────────────────────────────────────────────────

export const BRAND = {
    name: "Retail Control Architect",
    tagline: "The Retail Control Authority for Clothing Stores.",
    whatsapp: "https://wa.me/919353083597?text=Hi,%20I%20want%20to%20know%20more%20about%20Retail%20Control%20Architect",
    calendly: "https://calendly.com/nirvriksh/meet-up",
    primaryCta: "Apply for Private Stock Control Diagnostic",
    ctaNote: "Applications reviewed manually.",
} as const;

// ─── Hero ────────────────────────────────────────────────────────────────────

export const HERO = {
    headline1: "Retail Stock Mismatch Is a Control Failure.",
    headline2: "Not a Software Issue.",
    subheadline:
        "Retail Control Architect installs measurable stock discipline in 45 days for serious clothing store operators.",
    primaryCta: "Apply for Private Stock Control Diagnostic",
    secondaryCta: "Take 2-Minute Control Score Quiz",
    whatsappLabel: "Quick WhatsApp Inquiry",
    guarantee: "98% Stock Accuracy in 45 Days — Or We Continue Working Free Until It's Done.",
    // ─── VIDEO URL ───────────────────────────────────────────────────────
    // Paste your video URL below. Supports:
    //   YouTube: "https://www.youtube.com/watch?v=YOUR_ID" or "https://youtu.be/YOUR_ID"
    //   Vimeo:   "https://vimeo.com/YOUR_ID"
    //   Direct:  "https://example.com/video.mp4"
    //   Loom:    "https://www.loom.com/share/YOUR_ID"
    // Leave empty string "" to keep the placeholder.
    videoUrl: "https://youtu.be/A10nGzEyh0w",
} as const;

// ─── Quiz ────────────────────────────────────────────────────────────────────

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        id: 1,
        text: "Does your physical stock match your system stock 100%?",
        yesLabel: "Yes, always",
        noLabel: "No / Sometimes",
    },
    {
        id: 2,
        text: "Have you conducted a full physical audit in the last 30 days?",
        yesLabel: "Yes",
        noLabel: "No / Not recently",
    },
    {
        id: 3,
        text: "Do you rely on parallel manual registers alongside your system?",
        yesLabel: "No, system only",
        noLabel: "Yes, both",
    },
    {
        id: 4,
        text: "Is all supplier stock entry locked to your system — no manual bypasses?",
        yesLabel: "Yes, system only",
        noLabel: "No / Sometimes manual",
    },
    {
        id: 5,
        text: "Can you reconcile your full stock position in under 10 minutes daily?",
        yesLabel: "Yes",
        noLabel: "No, it takes longer",
    },
];

export const QUIZ_RESULTS = {
    highRisk: {
        score: [0, 2],
        label: "High Leakage Risk",
        percentage: (score: number) => Math.round((score / 5) * 100),
        description:
            "Your store has significant structural control gaps. Stock mismatch is likely compounding silently every month.",
        ctaText: "Request Private Diagnostic — Understand Your Exact Exposure",
        color: "#c0392b",
    },
    moderateRisk: {
        score: [3, 4],
        label: "Moderate Risk",
        percentage: (score: number) => Math.round((score / 5) * 100),
        description:
            "Some controls exist, but gaps remain. Partial structure is not the same as enforced structure.",
        ctaText: "Request Private Diagnostic — Close the Remaining Gaps",
        color: "#d4811f",
    },
    structured: {
        score: [5, 5],
        label: "Structured Control",
        percentage: () => 100,
        description:
            "Your controls score well. A diagnostic can confirm whether your structure is audit-proof.",
        ctaText: "Request Private Diagnostic — Validate Your Control Architecture",
        color: "#1a6b3c",
    },
} as const;

// ─── Pain Points ─────────────────────────────────────────────────────────────

export const PAIN_POINTS: PainPoint[] = [
    { metric: "8–15%", description: "average stock mismatch in single-store clothing retail" },
    { metric: "Month-end", description: "audit shock that reveals numbers no one expected" },
    { metric: "Supplier", description: "confusion from unrecorded or bypassed entries" },
    { metric: "Manual", description: "duplication across registers, sheets, and systems" },
    { metric: "Dead stock", description: "accumulation that quietly erodes working capital" },
];

export const PAIN_TAGLINE = "Retail chaos compounds quietly.";

// ─── Case Study ───────────────────────────────────────────────────────────────

export const CASE_STUDY: CaseStudyData = {
    storeName: "Lalitha Garments",
    beforeMetrics: [
        { value: "₹28L", label: "System Stock Value" },
        { value: "₹24.8L", label: "Physical Stock Value" },
        { value: "12%", label: "Mismatch Rate" },
        { value: "₹3.2L", label: "Exposure Identified" },
    ],
    afterMetrics: [
        { value: "<3%", label: "Mismatch Rate (45 Days)" },
        { value: "0", label: "Parallel Registers" },
        { value: "10 min", label: "Daily Control Routine" },
        { value: "Clean", label: "Audit Status" },
    ],
    quote: "Now I trust my numbers.",
    quoteAttr: "— Owner, Lalitha Garments",
};

// ─── ROI ─────────────────────────────────────────────────────────────────────

export const ROI_ROWS: RoiRow[] = [
    { mismatch: "3%", annual: "₹3,00,000", fiveYear: "₹15,00,000" },
    { mismatch: "5%", annual: "₹5,00,000", fiveYear: "₹25,00,000" },
];

export const ROI_TAGLINE = "Control is cheaper than leakage.";
export const ROI_BASE = "Based on ₹1 Crore annual turnover.";

// ─── Founder ─────────────────────────────────────────────────────────────────

export const FOUNDER = {
    headline: "I Don't Consult. I Install Control.",
    paragraphs: [
        "I was reviewing a client's stock records when the numbers stopped making sense. ₹4 lakhs — gone. Not stolen. Not lost. Simply unstructured. Supplier entries made on paper. Staff receipts unrecorded. Returns logged in a notebook.",
        "No fraud. Just chaos. And chaos, at scale, is indistinguishable from fraud on a balance sheet.",
        "That store became the first proof of the Retail Control Architecture model. I built an enforcement structure — not more software, not more meetings. A system of behavioral locks, daily routines, and accountability layers.",
        "The ₹4L gap closed within six weeks. The owner had clean numbers for the first time in four years.",
    ],
    closing: "That is what I build inside stores.",
} as const;

// ─── Framework ───────────────────────────────────────────────────────────────

export const FRAMEWORK_STEPS: FrameworkStep[] = [
    {
        number: "01",
        title: "Leakage Mapping Audit",
        description:
            "A structured diagnostic of every entry point — supplier, staff, returns, transfers — where stock can disappear without a trace.",
    },
    {
        number: "02",
        title: "SKU Discipline Architecture",
        description:
            "Every SKU assigned a unique ID, physical location, and system record. No ambiguity. No duplication. No exceptions.",
    },
    {
        number: "03",
        title: "Staff Accountability Layer",
        description:
            "Roles, access levels, and daily checkpoints that make accountability structural — not dependent on individual honesty.",
    },
    {
        number: "04",
        title: "Weekly Control Dashboard",
        description:
            "A single dashboard that shows stock variance, supplier discrepancies, and reconciliation status — every week without manual effort.",
    },
    {
        number: "05",
        title: "Lock & Enforcement Protocol",
        description:
            "The behavioral and system-level locks that prevent regression. Control is enforced, not trusted.",
    },
];

export const FRAMEWORK_TAGLINE = "We fix behavior. Not just software.";

// ─── Pricing ─────────────────────────────────────────────────────────────────

export const PRICING_OPTIONS: PricingOption[] = [
    {
        id: "founding",
        tag: "Founding Client Window — 2 Stores Only",
        title: "Founding Client Implementation",
        price: "₹95,000",
        subtext: "Once 2 stores are filled, standard pricing applies. No exceptions.",
        features: [
            "Full Retail Control Architecture installation",
            "Leakage Mapping Audit included",
            "45-day structured implementation",
            "Weekly accountability reviews",
            "Performance Guarantee included",
        ],
        isPrimary: true,
    },
    {
        id: "standard",
        title: "Standard Implementation",
        price: "₹1,20,000",
        subtext: "Standard pricing for all implementations after founding window closes.",
        features: [
            "Full Retail Control Architecture installation",
            "Leakage Mapping Audit included",
            "45-day structured implementation",
            "Weekly accountability reviews",
            "Performance Guarantee included",
        ],
        isPrimary: false,
    },
];

// ─── Audit Options ───────────────────────────────────────────────────────────

export const AUDIT_OPTIONS: AuditOption[] = [
    {
        id: "paid",
        title: "Private Stock Control Diagnostic",
        price: "₹5,000",
        description:
            "A structured 2-hour diagnostic of your store's control architecture — entry points, reconciliation gaps, and leakage exposure.",
        note: "Fully credited toward implementation. Ensures only serious operators apply.",
        isPrimary: true,
    },
    {
        id: "free",
        title: "Free Diagnostic Audit",
        price: "₹0",
        description:
            "A preliminary audit for stores that qualify as serious applicants. Application reviewed manually before confirmation.",
        note: "For serious applicants only. Not guaranteed for every inquiry.",
        isPrimary: false,
    },
];

// ─── Guarantee ───────────────────────────────────────────────────────────────

export const GUARANTEE = {
    headline: "Performance Guarantee.",
    body: "If stock mismatch does not measurably reduce within 30 days of structured installation, implementation continues at no additional fee until it does.",
    note: "This is not a refund policy. It is a performance commitment.",
} as const;

// ─── Scarcity ────────────────────────────────────────────────────────────────

export const SCARCITY = {
    headline: "Structured Onboarding. Not Open Enrollment.",
    points: [
        "Only 3 stores are onboarded per calendar month.",
        "Implementation cycles begin on the 1st of each month.",
        "Once a month is full, next available slot is the following month.",
        "Founding pricing closes permanently once 2 stores are filled.",
    ],
    note: "This is not artificial urgency. It is a capacity constraint built into the model.",
} as const;

// ─── Final Close ─────────────────────────────────────────────────────────────

export const FINAL_CLOSE = {
    headline1: "Your Store Deserves Structure.",
    headline2: "Your Margins Deserve Protection.",
    primaryCta: "Apply for Private Stock Control Diagnostic",
    secondaryCta: "Take Control Score Quiz",
} as const;
