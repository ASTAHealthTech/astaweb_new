import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { CONTACT_EMAIL, contactMain } from "@/content/contact";
import { buildPageMetadata } from "@/lib/seo";
import { StripeGridWrapper } from "@/components/layout/StripeGridWrapper";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description:
    "Terms of service for ASTA Health Tech Corporation: conditions governing use of our website and platform.",
  path: "/terms",
  keywords: [
    "ASTA terms of service",
    "website terms",
    "healthtech legal terms",
  ],
});

const LAST_UPDATED = "24 April 2026";

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 mt-8 text-[1.05rem] font-semibold tracking-tight text-fg dark:text-frost first:mt-0">
      {children}
    </h2>
  );
}

function Body({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[0.88rem] leading-relaxed text-fg-muted dark:text-frost-muted">
      {children}
    </p>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mb-3 space-y-1.5 pl-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-[0.88rem] leading-relaxed text-fg-muted dark:text-frost-muted">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function TermsPage() {
  return (
    <div className="pt-20 md:pt-24 space-y-0">
      <StripeGridWrapper>
        <div className="py-24">
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="mb-10 text-center">
                <h1 className="text-[2.25rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost md:text-[2.75rem]">
                  Terms of <span className="text-accent">Service</span>
                </h1>
                <p className="mt-2 text-[0.84rem] text-fg-subtle dark:text-frost-muted">
                  Last updated: {LAST_UPDATED}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-white p-8 shadow-sm dark:border-night-edge dark:bg-night-panel md:p-12">
                <SectionHeading>1. Acceptance of Terms</SectionHeading>
                <Body>
                  By accessing ASTA&rsquo;s website (astahealthtech.com) or requesting
                  access to ASTA&rsquo;s platform, you agree to be bound by these Terms of
                  Service. If you are accessing on behalf of an organisation or institution,
                  you confirm that you have authority to accept these terms on their behalf.
                </Body>

                <SectionHeading>2. Description of Service</SectionHeading>
                <Body>
                  ASTA Health Tech Corporation provides a device-agnostic clinical
                  intelligence platform that reads bedside monitor displays, extracts
                  structured vital signs, and supports clinical alerting workflows in
                  hospital environments. This website is an informational resource; platform
                  access is governed by separate institutional agreements.
                </Body>

                <SectionHeading>3. Healthcare Disclaimer</SectionHeading>
                <Body>
                  ASTA is a clinical decision support tool. It does not replace professional
                  clinical judgment. All clinical decisions remain the sole responsibility of
                  the treating clinician and the institution. ASTA&rsquo;s outputs are
                  intended to support, not supplant, qualified medical assessment and
                  clinical governance.
                </Body>

                <SectionHeading>4. Acceptable Use</SectionHeading>
                <Body>You agree not to:</Body>
                <List
                  items={[
                    "Access or attempt to access ASTA's platform without authorisation",
                    "Use this website or its content for any unlawful purpose",
                    "Transmit unsolicited commercial communications through our contact forms",
                    "Reproduce, redistribute, or commercially exploit website content without prior written permission",
                    "Attempt to reverse engineer, decompile, or extract source code from any ASTA software or platform component",
                  ]}
                />

                <SectionHeading>5. Intellectual Property</SectionHeading>
                <Body>
                  All content on this website (including text, design, graphics, data, and
                  software) is the property of ASTA Health Tech Corporation or its
                  licensors. The ASTA name, logo, and platform are protected under applicable
                  intellectual property laws.
                </Body>

                <SectionHeading>6. Governing Law</SectionHeading>
                <Body>
                  These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka, India.
                </Body>

                <SectionHeading>7. Contact</SectionHeading>
                <Body>
                  <strong className="font-semibold text-fg dark:text-frost">
                    ASTA Health Tech Corporation
                  </strong>
                  <br />
                  {contactMain.address.body}
                  <br />
                  Email:{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-semibold text-accent hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </Body>
              </div>
            </div>
          </Container>
        </div>
      </StripeGridWrapper>
    </div>
  );
}
