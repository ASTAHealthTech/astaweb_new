import type { Metadata } from "next";
import { StubPage } from "@/components/ui/StubPage";
import { CONTACT_EMAIL } from "@/content/contact";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Careers",
  description:
    "Join the team building clinical AI for real hospital wards. Roles in ML/CV engineering, clinical informatics, and full-stack development.",
  path: "/careers",
  keywords: [
    "healthtech careers",
    "clinical AI jobs",
    "hospital AI engineering roles",
    "ASTA careers",
  ],
});

export default function CareersPage() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-brand-gradient-soft"
      />
      <StubPage
      label="Careers"
      headline="Build clinical AI that runs in real wards."
      body="We are assembling a team at the intersection of machine learning, clinical environments, and hospital deployment — ML and computer vision engineers, clinical informatics professionals, full-stack engineers with healthcare domain interest, and clinical advisors. Our work ships to active patient-care environments, not demos. Formal openings will be posted here; until then, reach out directly to be considered ahead of the next round."
      ctaLabel="Send your profile"
      ctaHref={`mailto:${CONTACT_EMAIL}?subject=Career%20inquiry%20%7C%20ASTA`}
    />
    </div>
  );
}
