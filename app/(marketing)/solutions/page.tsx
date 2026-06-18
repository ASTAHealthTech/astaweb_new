import type { Metadata } from "next";
import { SolutionsHero } from "@/components/sections/solutions/SolutionsHero";
import { CapabilitySuite } from "@/components/sections/solutions/CapabilitySuite";
import { DashboardWalkthrough } from "@/components/sections/solutions/DashboardWalkthrough";
import { InteropGovernance } from "@/components/sections/solutions/InteropGovernance";
import { MonitoringInPractice } from "@/components/sections/solutions/MonitoringInPractice";
import { SolutionsCTA } from "@/components/sections/solutions/SolutionsCTA";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Solutions",
  description:
    "ASTA reads existing bedside monitors, structures vitals in real time, and drives role-aware escalation without a new monitor fleet.",
  path: "/solutions",
  keywords: [
    "hospital monitoring solutions",
    "device agnostic monitoring",
    "clinical workflow software",
    "role aware escalation",
  ],
});

export default function SolutionsPage() {
  return (
    <>
      <SolutionsHero />
      <CapabilitySuite />
      <DashboardWalkthrough />
      <InteropGovernance />
      <MonitoringInPractice />
      <SolutionsCTA />
    </>
  );
}
