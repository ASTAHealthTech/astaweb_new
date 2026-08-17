import type { Metadata } from "next";
import { PartnerMainSection } from "@/components/sections/channel-partner/PartnerMainSection";
import { StripeGridWrapper } from "@/components/layout/StripeGridWrapper";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Channel Partners",
  description:
    "Partner with ASTA Health Tech to bring continuous clinical AI to hospitals in your region.",
  path: "/channel-partner",
  keywords: [
    "ASTA channel partner",
    "healthcare AI distributor",
    "healthtech partnership",
    "hospital software partner",
  ],
});

export default function ChannelPartnerPage() {
  return (
    <div className="pt-20 md:pt-24 space-y-0">
      <StripeGridWrapper>
        <PartnerMainSection />
      </StripeGridWrapper>
    </div>
  );
}
