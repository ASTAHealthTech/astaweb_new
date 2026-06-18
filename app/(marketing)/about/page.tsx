import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutFoundingThesis } from "@/components/sections/about/AboutFoundingThesis";
import { AboutLeadership } from "@/components/sections/about/AboutLeadership";
import { AboutAdvisoryBoard } from "@/components/sections/about/AboutAdvisoryBoard";
import { AboutInstitutionalPedigree } from "@/components/sections/about/AboutInstitutionalPedigree";
import { AboutCTA } from "@/components/sections/about/AboutCTA";
import { buildPageMetadata } from "@/lib/seo";

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
  return (
    <>
      <AboutHero />
      <AboutFoundingThesis />
      <AboutLeadership />
      <AboutAdvisoryBoard />
      <AboutInstitutionalPedigree />
      <AboutCTA />
    </>
  );
}
