import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { CONTACT_EMAIL, contactMain } from "@/content/contact";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description:
    "Terms of service for ASTA Healthtech Private Limited — conditions governing use of our website and platform.",
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
    <h2 className="mb-3 mt-8 text-[1.02rem] font-semibold tracking-tight text-slate-800 first:mt-0 dark:text-frost/90">
      {children}
    </h2>
  );
}

function Body({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[0.88rem] leading-relaxed text-slate-600 dark:text-white/55">
      {children}
    </p>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mb-3 space-y-1.5 pl-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-[0.88rem] leading-relaxed text-slate-600 dark:text-white/55">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400/60 dark:bg-white/25" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function TermsPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-[#060816] pb-12 pt-28 md:pt-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-grid-fine bg-[length:44px_44px] opacity-30" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 30%,transparent 40%,rgba(6,8,22,0.80) 100%)",
            }}
          />
        </div>
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/45">
              Legal · ASTA Healthtech
            </div>
            <h1 className="mt-5 text-[2.2rem] font-semibold tracking-[-0.04em] text-frost md:text-[2.8rem]">
              Terms of Service
            </h1>
            <p className="mt-3 text-[0.84rem] text-white/40">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="bg-canvas py-16 pb-24 dark:bg-[#060816]">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-8 shadow-sm dark:border-white/[0.07] dark:bg-[#040810] md:p-12">

              <SectionHeading>1. Acceptance of Terms</SectionHeading>
              <Body>
                By accessing ASTA&rsquo;s website (astahealthtech.com) or requesting
                access to ASTA&rsquo;s platform, you agree to be bound by these Terms of
                Service. If you are accessing on behalf of an organisation or institution,
                you confirm that you have authority to accept these terms on their behalf.
              </Body>

              <SectionHeading>2. Description of Service</SectionHeading>
              <Body>
                ASTA Healthtech Private Limited provides a device-agnostic clinical
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
              <Body>
                Nothing on this website constitutes medical advice. Do not rely on
                information on this site for clinical decision-making.
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
                All content on this website — including text, design, graphics, data, and
                software — is the property of ASTA Healthtech Private Limited or its
                licensors. The ASTA name, logo, and platform are protected under applicable
                intellectual property laws. Nothing in these Terms grants you any licence
                to use ASTA&rsquo;s intellectual property except as expressly permitted.
              </Body>

              <SectionHeading>6. Third-Party Links</SectionHeading>
              <Body>
                This website may contain links to third-party websites. ASTA is not
                responsible for the content, accuracy, or privacy practices of any linked
                website. Links do not constitute endorsement.
              </Body>

              <SectionHeading>7. Disclaimer of Warranties</SectionHeading>
              <Body>
                This website and its content are provided &ldquo;as is&rdquo; without
                warranty of any kind, express or implied. ASTA does not warrant that the
                website will be uninterrupted, error-free, or free of harmful components.
              </Body>

              <SectionHeading>8. Limitation of Liability</SectionHeading>
              <Body>
                To the fullest extent permitted by applicable law, ASTA Healthtech
                Private Limited shall not be liable for any indirect, incidental, special,
                or consequential damages arising from use of this website or reliance on
                information contained herein, including but not limited to loss of profits,
                data, or goodwill.
              </Body>

              <SectionHeading>9. Changes to Terms</SectionHeading>
              <Body>
                We reserve the right to update these Terms at any time. Revised terms
                will be posted on this page with an updated date. Continued use of the
                website following notice of changes constitutes acceptance of the revised
                terms.
              </Body>

              <SectionHeading>10. Governing Law and Jurisdiction</SectionHeading>
              <Body>
                These Terms are governed by the laws of India. Any disputes arising in
                connection with these Terms shall be subject to the exclusive jurisdiction
                of the courts in Bengaluru, Karnataka, India.
              </Body>

              <SectionHeading>11. Contact</SectionHeading>
              <Body>For legal inquiries or questions regarding these Terms:</Body>
              <Body>
                <strong className="font-semibold text-slate-800 dark:text-frost/80">
                  ASTA Healthtech Private Limited
                </strong>
                <br />
                {contactMain.address.body}
                <br />
                Email:{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-brand-600 underline-offset-2 hover:underline dark:text-brand-400"
                >
                  {CONTACT_EMAIL}
                </a>
              </Body>

            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
