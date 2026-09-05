import type { Metadata } from "next";
import { StubPage } from "@/components/ui/StubPage";
import { CONTACT_EMAIL } from "@/content/contact";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Press",
  description:
    "Media coverage, institutional recognition, and deployment milestones from ASTA Health Tech.",
  path: "/press",
  keywords: [
    "ASTA press",
    "healthtech media coverage",
    "clinical AI milestones",
    "ASTA news",
  ],
});

export default function PressPage() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-brand-gradient-soft"
      />
      <StubPage
      label="Press"
      headline="ASTA in the media."
      body="Institutional recognition, deployment milestones, and media coverage as ASTA builds the clinical intelligence layer for Indian hospital wards. ASTA is backed by MeitY Startup Hub, IISER Pune, AIC-SEED, and NIT Andhra Pradesh. Published coverage is being compiled; for interview requests, product briefings, or access to the media kit, contact the team directly."
      ctaLabel="Contact for press"
      ctaHref={`mailto:${CONTACT_EMAIL}?subject=Press%20inquiry%20%7C%20ASTA`}
    />
    </div>
  );
}
