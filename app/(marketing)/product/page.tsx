import type { Metadata } from "next";
import { PlatformIntelligenceStack } from "@/components/sections/platform/PlatformIntelligenceStack";
import { PlatformSignalFlow } from "@/components/sections/platform/PlatformSignalFlow";
import { PlatformComputerVision } from "@/components/sections/platform/PlatformComputerVision";
import { PlatformReasoningLayer } from "@/components/sections/platform/PlatformReasoningLayer";
import { PlatformDeploymentArchitecture } from "@/components/sections/platform/PlatformDeploymentArchitecture";
import { PlatformValidation } from "@/components/sections/platform/PlatformValidation";

import { OemCompatibilityMatrix } from "@/components/sections/home/OemCompatibilityMatrix";
import { DashboardWalkthrough } from "@/components/sections/solutions/DashboardWalkthrough";
import { StripeGridWrapper, GridRow, CrossLine } from "@/components/layout/StripeGridWrapper";
import { buildPageMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Clinical AI Platform & Physiological Reasoning",
  description:
    "ASTA Health Tech provides enterprise AI healthcare solutions: a device-agnostic intelligence platform for screen reading, physiological AI reasoning, and evidence-linked clinical output.",
  keywords: [
    "AI healthcare solutions",
    "clinical AI platform",
    "physiological reasoning",
    "computer vision monitor reading",
    "hospital AI platform",
  ],
  path: "/product",
});

export default function PlatformPage() {
  const breadcrumbs = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Product", url: "/product" },
  ]);

  return (
    <div className="pt-20 md:pt-24 space-y-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <div id="escalation">
        <PlatformIntelligenceStack />
      </div>

      <StripeGridWrapper>
        <GridRow striped>
          <CrossLine dashed />
          <div id="signal-flow">
            <PlatformSignalFlow />
          </div>
          <div id="computer-vision">
            <PlatformComputerVision />
          </div>
        </GridRow>
        
        <GridRow striped={false}>
          <CrossLine />
          <div id="oem-matrix">
            <OemCompatibilityMatrix />
          </div>
          <div id="reasoning-layer">
            <PlatformReasoningLayer />
          </div>
        </GridRow>
        
        <GridRow striped>
          <CrossLine dashed />
          <div id="evidence-differential">
            <PlatformValidation />
          </div>
          <div id="dashboard">
            <DashboardWalkthrough />
          </div>
        </GridRow>
        
        <GridRow striped={false}>
          <CrossLine />
          <PlatformDeploymentArchitecture />
        </GridRow>
      </StripeGridWrapper>

    </div>
  );
}
