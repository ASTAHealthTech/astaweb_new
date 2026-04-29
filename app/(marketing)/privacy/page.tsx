import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { CONTACT_EMAIL, contactMain } from "@/content/contact";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for ASTA Healthtech Private Limited — how we collect, use, and protect your information.",
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

export default function PrivacyPage() {
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
              Privacy Policy
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

              <SectionHeading>1. Introduction</SectionHeading>
              <Body>
                ASTA Healthtech Private Limited (&ldquo;ASTA&rdquo;, &ldquo;we&rdquo;,
                &ldquo;our&rdquo;) is committed to protecting the privacy of individuals
                who interact with our platform, website, and services. This Privacy Policy
                explains what information we collect, how we use it, and the rights
                available to you.
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
                from bedside monitor displays only. The platform:
              </Body>
              <List
                items={[
                  "Captures numerical display data only — no patient imagery is collected, stored, or transmitted",
                  "Processes vital sign numerics to support clinical alerting workflows",
                  "Does not store personal patient biometrics, facial data, or video recordings",
                ]}
              />
              <Body>
                Data governance within hospital deployments is subject to a separate
                data processing agreement with the institution.
              </Body>

              <SectionHeading>4. How We Use Information</SectionHeading>
              <Body>We use the information we collect to:</Body>
              <List
                items={[
                  "Respond to inquiries and coordinate product walkthroughs or deployment conversations",
                  "Deliver and continuously improve our platform and services",
                  "Send product updates and clinical AI insights (with your consent)",
                  "Fulfil our legal and regulatory obligations",
                ]}
              />

              <SectionHeading>5. Data Sharing</SectionHeading>
              <Body>
                We do not sell your personal information. We may share information with:
              </Body>
              <List
                items={[
                  "Technology service providers (cloud infrastructure, communications platforms) under data processing agreements",
                  "Government or regulatory authorities when required by applicable law",
                ]}
              />

              <SectionHeading>6. Your Rights under the DPDP Act 2023</SectionHeading>
              <Body>
                Under India&rsquo;s Digital Personal Data Protection Act 2023, you have
                the right to:
              </Body>
              <List
                items={[
                  "Access the personal data we hold about you",
                  "Correct inaccurate or incomplete personal data",
                  "Request erasure of personal data, subject to our legal obligations",
                  "Nominate a representative to act on your behalf for data management purposes",
                  "File a grievance with our data protection team or with the Data Protection Board of India",
                ]}
              />
              <Body>To exercise any of these rights, contact us using the details below.</Body>

              <SectionHeading>7. Data Retention</SectionHeading>
              <Body>
                We retain your personal information only as long as necessary for the
                purposes described in this policy, or as required by applicable law.
                Inquiry and communication records are typically retained for up to
                three years.
              </Body>

              <SectionHeading>8. Security</SectionHeading>
              <Body>
                We implement technical and organisational measures appropriate to the
                nature of the data we process, including encryption in transit and at
                rest, access controls, and secure communication protocols. No transmission
                over the internet is entirely secure; however, we take reasonable steps
                to protect your information.
              </Body>

              <SectionHeading>9. Cookies and Tracking</SectionHeading>
              <Body>
                Our website may use cookies and similar technologies for analytics and
                performance monitoring. You may control cookie preferences through your
                browser settings.
              </Body>

              <SectionHeading>10. Changes to This Policy</SectionHeading>
              <Body>
                We may update this Privacy Policy from time to time. We will note the
                revised date at the top of this page. Continued use of our website
                following any updates constitutes acceptance of the revised policy.
              </Body>

              <SectionHeading>11. Contact</SectionHeading>
              <Body>
                For privacy-related questions, data access requests, or to exercise
                your rights under the DPDP Act 2023:
              </Body>
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
