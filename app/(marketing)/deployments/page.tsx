import type { Metadata } from "next";
import { UseCaseClusters } from "@/components/sections/use-cases/UseCaseClusters";
import { UseCasesAcademicValue } from "@/components/sections/use-cases/UseCasesAcademicValue";
import { UseCasesOutcomes } from "@/components/sections/use-cases/UseCasesOutcomes";
import { StripeGridWrapper, GridRow, CrossLine } from "@/components/layout/StripeGridWrapper";

import { buildPageMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Deployments & Use Cases",
  description:
    "See where ASTA creates value across real hospital environments: from general wards and ICU/HCU oversight to peripheral centers, teaching hospitals, and specialized monitored settings.",
  keywords: [
    "hospital AI use cases",
    "smart wards",
    "ICU monitoring",
    "teaching hospital AI",
  ],
  path: "/deployments",
});

export default function UseCasesPage() {
  const breadcrumbs = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Deployments", url: "/deployments" },
  ]);

  return (
    <div className="pt-20 md:pt-24 space-y-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <div id="deployment-contexts">
        <UseCaseClusters />
      </div>
      <StripeGridWrapper>
        <GridRow striped>
          <CrossLine dashed />
          <div id="academic-value">
            <UseCasesAcademicValue />
          </div>
        </GridRow>
        
        <GridRow striped={false}>
          <CrossLine />
          <div id="outcomes">
            <UseCasesOutcomes />
          </div>
        </GridRow>
      </StripeGridWrapper>

    </div>
  );
}
