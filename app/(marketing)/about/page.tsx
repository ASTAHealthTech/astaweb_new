import type { Metadata } from "next";
import { AboutFoundingThesis } from "@/components/sections/about/AboutFoundingThesis";
import { AboutLeadership } from "@/components/sections/about/AboutLeadership";
import { AboutAdvisoryBoard } from "@/components/sections/about/AboutAdvisoryBoard";
import { AboutInstitutionalPedigree } from "@/components/sections/about/AboutInstitutionalPedigree";
import { StripeGridWrapper, GridRow, CrossLine } from "@/components/layout/StripeGridWrapper";

import { buildPageMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "Meet the team, advisors, and institutional backing behind ASTA's device-agnostic clinical intelligence platform for real hospital wards.",
  path: "/about",
  keywords: [
    "ASTA team",
    "healthtech founders",
    "clinical AI leadership",
    "hospital AI company",
  ],
});

export default function AboutPage() {
  const breadcrumbs = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  return (
    <div className="pt-20 md:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <AboutFoundingThesis />
      <StripeGridWrapper>
        <GridRow striped>
          <CrossLine dashed />
          <AboutLeadership />
        </GridRow>
        
        <GridRow striped={false}>
          <CrossLine />
          <AboutAdvisoryBoard />
        </GridRow>
        
        <GridRow striped>
          <CrossLine dashed />
          <AboutInstitutionalPedigree />
        </GridRow>
      </StripeGridWrapper>

    </div>
  );
}
