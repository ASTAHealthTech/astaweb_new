import type { Metadata } from "next";
import { StubPage } from "@/components/ui/StubPage";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-brand-gradient-soft"
      />
      <StubPage
      label="Page not found"
      headline="This page is not in the document."
      body="The address you followed does not match any section of this site. Check the URL, or return to the start of the document."
      ctaLabel="Return home"
      ctaHref="/"
    />
    </div>
  );
}
