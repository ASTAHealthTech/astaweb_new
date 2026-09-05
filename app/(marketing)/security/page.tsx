import type { Metadata } from "next";
import { StubPage } from "@/components/ui/StubPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Security",
  description:
    "ASTA's security posture: numerical vitals only, no patient imagery, encryption in transit and at rest, role-based access, and full audit trail under hospital control.",
  path: "/security",
  keywords: [
    "ASTA security",
    "hospital data security",
    "clinical AI security posture",
  ],
});

export default function SecurityPage() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-brand-gradient-soft"
      />
      <StubPage
      label="Security"
      headline="Numerical data only. Hospital-controlled."
      body="ASTA reads LCD display numerics, not patients — no patient imagery is captured, stored, or transmitted, and standard monitoring consent applies. The platform operates under ISO 13485-certified quality management with a DPDP-aligned architecture, encryption in transit and at rest, role-based access control at every layer, and a full audit trail, with deployment posture — data residency, retention, and access — under hospital ownership. A detailed security overview is available on request."
    />
    </div>
  );
}
