import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactMainSection } from "@/components/sections/contact/ContactMainSection";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact ASTA through a streamlined landing page centered on a simple inquiry form, WhatsApp chat, and essential deployment contact details.",
  path: "/contact",
  keywords: [
    "contact ASTA",
    "hospital AI demo",
    "healthtech inquiry",
    "ASTA Healthtech contact",
  ],
});

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactMainSection />
    </>
  );
}
