import type { Metadata } from "next";
import { SignalHero } from "@/components/sections/home/SignalHero";
import { TheCapture } from "@/components/sections/home/TheCapture";
import { TheModel } from "@/components/sections/home/TheModel";
import { TheLab } from "@/components/sections/home/TheLab";
import { TheAssistant } from "@/components/sections/home/TheAssistant";
import { TheWard } from "@/components/sections/home/TheWard";
import { FinalCTA } from "@/components/sections/home/FinalCTA";
import { Ground } from "@/components/visual/scene/Ground";
import { ClinicalAiInAction } from "@/components/sections/home/ClinicalAiInAction";
import { InstitutionalTrust } from "@/components/sections/home/InstitutionalTrust";
import { TrustPostures } from "@/components/sections/home/TrustPostures";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { Capabilities } from "@/components/sections/home/Capabilities";
import { Outcomes } from "@/components/sections/home/Outcomes";
import { SecurityBand } from "@/components/sections/home/SecurityBand";
import { TheNetwork } from "@/components/sections/home/TheNetwork";
import {
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

/**
 * One signal, followed all the way.
 *
 *   hero       the monitor and the unit watching it
 *   capture    what the unit sees: the frame, the boxes, the values off the glass
 *   model      the PPLM builds itself — readings, network, council, forecast
 *   lab        the trained specialists: heart, lungs, deterioration, trajectory
 *   assistant  what the ward gets: the assessment, as a working card deck
 *   ward       every bed live, then the hospital graph rising out of it
 *   network    ten hospitals across two states
 *   — ground — the walkthrough, how it works, who backs it, what it runs on
 */
export default function HomePage() {
  return (
    <>
      <SignalHero />

      <TheCapture />

      <TheModel />

      <TheLab />

      <TheAssistant />

      <TheWard />

      <TheNetwork />

      <Ground>
        <ClinicalAiInAction />
        <HowItWorks />
        <InstitutionalTrust />
        <TrustPostures />
        <Capabilities />
        <Outcomes />
        <SecurityBand />
        <FinalCTA />
      </Ground>
    </>
  );
}
