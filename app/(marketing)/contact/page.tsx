import type { Metadata } from "next";
import { ContactMainSection } from "@/components/sections/contact/ContactMainSection";
import { StripeGridWrapper } from "@/components/layout/StripeGridWrapper";
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

export default function ContactPage() {
  return (
    <div className="pt-20 md:pt-24 space-y-0">
      <StripeGridWrapper>
        <ContactMainSection />
      </StripeGridWrapper>
    </div>
  );
}
