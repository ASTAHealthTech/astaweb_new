import type { Metadata } from "next";
import { StubPage } from "@/components/ui/StubPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Compliance",
  description:
    "ASTA's compliance posture: ISO 13485-certified quality management, DPDP-aligned data handling, HL7/FHIR-aligned interoperability, and CDSCO SaMD registration in progress.",
  path: "/compliance",
  keywords: [
    "ASTA compliance",
    "ISO 13485",
    "DPDP alignment",
    "SaMD registration",
  ],
});

export default function CompliancePage() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-brand-gradient-soft"
      />
      <StubPage
      label="Compliance"
      headline="Built for institutional deployment."
      body="ASTA's compliance posture is engineered for regulated clinical environments: ISO 13485-certified quality management, DPDP-aligned data handling, HL7/FHIR-aligned interoperability, and CDSCO SaMD registration in progress. Numerical vitals only, no patient imagery, standard monitoring consent, consent tracking, and a legal audit trail keep the platform inside existing hospital governance requirements. Detailed compliance documentation is available on request."
    />
    </div>
  );
}
