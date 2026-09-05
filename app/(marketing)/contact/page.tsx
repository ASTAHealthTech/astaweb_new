import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactSpread } from "@/components/sections/contact/ContactSpread";
import { ContactProofStrip } from "@/components/sections/contact/ContactProofStrip";
import { ContactNextSteps } from "@/components/sections/contact/ContactNextSteps";
import { ContactDetails } from "@/components/sections/contact/ContactDetails";
import { resolveContactInquiryType } from "@/content/contact";
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
    "ASTA Health Tech contact",
  ],
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>;
}) {
  const { intent } = await searchParams;
  const defaultInquiryType = resolveContactInquiryType(intent);

  return (
    <>
      <ContactHero />
      <ContactSpread defaultInquiryType={defaultInquiryType} />
      <ContactProofStrip />
      <ContactNextSteps />
      <ContactDetails />
    </>
  );
}
