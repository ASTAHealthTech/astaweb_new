import type { Metadata } from "next";
import { CapabilitySuite } from "@/components/sections/solutions/CapabilitySuite";
import { InteropGovernance } from "@/components/sections/solutions/InteropGovernance";
import { MonitoringInPractice } from "@/components/sections/solutions/MonitoringInPractice";
import { StripeGridWrapper, GridRow, CrossLine } from "@/components/layout/StripeGridWrapper";

import { buildPageMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Healthcare Solutions & Clinical Intelligence",
  description:
    "ASTA Health Tech delivers continuous AI healthcare solutions: converting raw monitor displays into real-time structured vitals and role-aware clinical escalation without hardware fleet replacement.",
  path: "/solutions",
  keywords: [
    "AI healthcare solutions",
    "clinical AI platform",
    "device agnostic AI",
    "physiological reasoning AI",
    "role aware escalation",
  ],
});

export default function SolutionsPage() {
  const breadcrumbs = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/solutions" },
  ]);

  return (
    <div className="pt-20 md:pt-24 space-y-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <MonitoringInPractice />
      <StripeGridWrapper>
        <GridRow striped>
          <CrossLine dashed />
          <CapabilitySuite />
        </GridRow>
        
        <GridRow striped={false}>
          <CrossLine />
          <InteropGovernance />
        </GridRow>
      </StripeGridWrapper>

    </div>
  );
}
