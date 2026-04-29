import type { Metadata } from "next";
import { PlatformHero } from "@/components/sections/platform/PlatformHero";
import { PlatformIntelligenceStack } from "@/components/sections/platform/PlatformIntelligenceStack";
import { PlatformSignalFlow } from "@/components/sections/platform/PlatformSignalFlow";
import { PlatformComputerVision } from "@/components/sections/platform/PlatformComputerVision";
import { PlatformReasoningLayer } from "@/components/sections/platform/PlatformReasoningLayer";
import { PlatformDeploymentArchitecture } from "@/components/sections/platform/PlatformDeploymentArchitecture";
import { PlatformValidation } from "@/components/sections/platform/PlatformValidation";
import { PlatformCTA } from "@/components/sections/platform/PlatformCTA";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Platform",
  description:
    "ASTA is a device-agnostic clinical intelligence stack for monitor reading, physiological reasoning, and evidence-linked clinical output.",
  path: "/platform",
  keywords: [
    "clinical intelligence platform",
    "physiological reasoning",
    "computer vision monitor reading",
    "hospital AI platform",
  ],
});

export default function PlatformPage() {
  return (
    <>
      <PlatformHero />
      <PlatformIntelligenceStack />
      <PlatformSignalFlow />
      <PlatformComputerVision />
      <PlatformReasoningLayer />
      <PlatformDeploymentArchitecture />
      <PlatformValidation />
      <PlatformCTA />
    </>
  );
}
