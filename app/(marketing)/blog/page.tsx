import type { Metadata } from "next";
import { StubPage } from "@/components/ui/StubPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description:
    "Clinical AI insights, smart ward deployment perspectives, and hospital intelligence updates from the ASTA team.",
  path: "/blog",
  keywords: [
    "clinical AI blog",
    "hospital intelligence insights",
    "smart ward articles",
    "healthcare AI updates",
  ],
});

export default function BlogPage() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-brand-gradient-soft"
      />
      <StubPage
      label="Blog"
      headline="Perspectives on hospital AI."
      body="Smart ward deployment, clinical reasoning architecture, and practical hospital intelligence from the ASTA team — why trajectory-aware alerting differs from threshold triggers, what makes hospital deployment unlike enterprise software, and how monitor-agnostic vital extraction works across mixed OEM estates. First articles are in preparation."
    />
    </div>
  );
}
