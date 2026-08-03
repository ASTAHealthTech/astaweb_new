import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { CONTACT_EMAIL, contactMain } from "@/content/contact";
import { buildPageMetadata } from "@/lib/seo";
import { StripeGridWrapper } from "@/components/layout/StripeGridWrapper";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for ASTA Health Tech Corporation: how we collect, use, and protect your information.",
  path: "/privacy",
  keywords: [
    "ASTA privacy policy",
    "healthtech privacy",
    "website privacy policy",
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

export default function PrivacyPage() {
  return (
    <div className="pt-20 md:pt-24 space-y-0">
      <StripeGridWrapper>
        <div className="py-24">
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="mb-10 text-center">
                <h1 className="text-[2.25rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost md:text-[2.75rem]">
                  Privacy <span className="text-accent">Policy</span>
                </h1>
                <p className="mt-2 text-[0.84rem] text-fg-subtle dark:text-frost-muted">
                  Last updated: {LAST_UPDATED}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-white p-8 shadow-sm dark:border-night-edge dark:bg-night-panel md:p-12">
                <SectionHeading>1. Introduction</SectionHeading>
                <Body>
                  ASTA Health Tech Corporation (&ldquo;ASTA&rdquo;, &ldquo;we&rdquo;,
                  &ldquo;our&rdquo;) is committed to protecting the privacy of individuals
                  who interact with our platform, website, and services.
                </Body>

                <SectionHeading>2. Information We Collect</SectionHeading>
                <Body>
                  When you interact with our website or request a product walkthrough,
                  we may collect:
                </Body>
                <List
                  items={[
                    "Contact information (name, email address, phone number)",
                    "Professional information (hospital or institution name, role or title)",
                    "Usage data (browser type, pages visited, session duration)",
                    "Communication records (inquiry form submissions, email exchanges)",
                  ]}
                />
                <Body>
                  We do not collect patient data, clinical records, or protected health
                  information through this website.
                </Body>

                <SectionHeading>3. Platform Data Handling</SectionHeading>
                <Body>
                  ASTA&rsquo;s clinical intelligence platform reads numerical vital signs
                  from bedside monitor displays only:
                </Body>
                <List
                  items={[
                    "Captures numerical display data only: no patient imagery is collected, stored, or transmitted",
                    "Processes vital sign numerics to support clinical alerting workflows",
                    "Does not store personal patient biometrics, facial data, or video recordings",
                  ]}
                />

                <SectionHeading>4. Rights under the DPDP Act 2023</SectionHeading>
                <Body>
                  Under India&rsquo;s Digital Personal Data Protection Act 2023, you have
                  the right to access, correct, or request erasure of your personal data.
                </Body>

                <SectionHeading>5. Contact</SectionHeading>
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
