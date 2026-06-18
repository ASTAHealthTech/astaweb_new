import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";
import { ClinicalAiInAction } from "@/components/sections/home/ClinicalAiInAction";
import { InstitutionalTrust } from "@/components/sections/home/InstitutionalTrust";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { Capabilities } from "@/components/sections/home/Capabilities";
import { Outcomes } from "@/components/sections/home/Outcomes";
import { SecurityBand } from "@/components/sections/home/SecurityBand";
import { FinalCTA } from "@/components/sections/home/FinalCTA";
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClinicalAiInAction />
      <InstitutionalTrust />
      <HowItWorks />
      <Capabilities />
      <Outcomes />
      <SecurityBand />
      <FinalCTA />
    </>
  );
}
