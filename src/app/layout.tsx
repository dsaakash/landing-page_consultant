import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/ui/SiteHeader";

// ─── Metadata (SEO) ───────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Retail Control Architect — 98% Stock Accuracy in 45 Days",
  description:
    "Retail Control Architect installs measurable stock discipline inside single-store clothing retailers. Achieve 98% stock accuracy in 45 days — or we continue working free until it's done.",
  keywords: [
    "retail stock control",
    "stock mismatch solution",
    "clothing store inventory management",
    "retail consultant India",
    "stock audit clothing store",
    "inventory accuracy",
  ],
  openGraph: {
    title: "Retail Control Architect — Stock Mismatch Is a Control Failure",
    description:
      "Measurable stock discipline installed in 45 days for serious clothing store operators.",
    type: "website",
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
