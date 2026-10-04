import type { Metadata } from "next";
import { Ground } from "@/components/visual/scene/Ground";
import { PressHero } from "@/components/sections/press/PressHero";
import { PressFeatured } from "@/components/sections/press/PressFeatured";
import { PressStory } from "@/components/sections/press/PressStory";
import { PressAll } from "@/components/sections/press/PressAll";
import { PressContact } from "@/components/sections/press/PressContact";
import { pressStats } from "@/content/press";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Press",
  description: `ASTA Health Tech's announcement of its Physiological Pattern Learning Model, published by ${pressStats.outlets} news outlets in October 2026. Every outlet, linked.`,
  path: "/press",
  keywords: ["ASTA press", "ASTA Health Tech news", "healthtech media coverage", "clinical AI India", "PPLM"],
});

export default function PressPage() {
  return (
    <Ground>
      <PressHero />
      <PressFeatured />
      <PressStory />
      <PressAll />
      <PressContact />
    </Ground>
  );
}
