// ─── Page Orchestrator (Facade Pattern) ──────────────────────────────────────
//
// This file's only responsibility is to import and order sections.
// No business logic lives here. All copy lives in lib/constants.ts.
// All state logic lives in hooks/. All UI logic lives in components/.
//
// Adding, removing, or reordering sections requires changing only this file.

import { HeroSection } from "@/components/sections/HeroSection";
import { QuizSection } from "@/components/sections/QuizSection";
import { HiddenRealitySection } from "@/components/sections/HiddenRealitySection";
import { CaseStudySection } from "@/components/sections/CaseStudySection";
import { RoiSection } from "@/components/sections/RoiSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { FrameworkSection } from "@/components/sections/FrameworkSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { AuditSection } from "@/components/sections/AuditSection";
import { GuaranteeSection } from "@/components/sections/GuaranteeSection";
import { ScarcitySection } from "@/components/sections/ScarcitySection";
import { FinalCloseSection } from "@/components/sections/FinalCloseSection";

export default function HomePage() {
  return (
    <main>
      {/* Section 1 — Hero: Authority entry, primary CTA */}
      <HeroSection />

      {/* Section 2 — Quiz: Lead capture via structural assessment */}
      <QuizSection />

      {/* Section 3 — Hidden Reality: Pain point validation */}
      <HiddenRealitySection />

      {/* Section 4 — Case Study: Evidence and trust */}
      <CaseStudySection />

      {/* Section 5 — ROI: Math-based logical justification */}
      <RoiSection />

      {/* Section 6 — Founder: Human layer, authority positioning */}
      <FounderSection />

      {/* Section 7 — Framework: The model, deliverables */}
      <FrameworkSection />

      {/* Section 8 — Pricing: Investment paths, founding urgency */}
      <PricingSection />

      {/* Section 9 — Diagnostic: Entry point options */}
      <AuditSection />

      {/* Section 10 — Guarantee: Risk removal */}
      <GuaranteeSection />

      {/* Section 11 — Scarcity: Capacity constraint (not theatrics) */}
      <ScarcitySection />

      {/* Section 12 — Final Close: All CTAs, footer */}
      <FinalCloseSection />
    </main>
  );
}
