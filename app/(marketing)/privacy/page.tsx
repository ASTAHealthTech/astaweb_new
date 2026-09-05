import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionHeader, SectionEnd } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/Button";
import {
  LegalBlock,
  LegalBody,
  LegalList,
} from "@/components/sections/legal/LegalBlock";
import { CONTACT_EMAIL, contactMain } from "@/content/contact";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for ASTA Health Tech Corporation — how we collect, use, and protect your information.",
  path: "/privacy",
  keywords: [
    "ASTA privacy policy",
    "healthtech privacy",
    "website privacy policy",
  ],
});

const LAST_UPDATED = "24 April 2026";

export default function PrivacyPage() {
  return (
    <section className="relative py-section pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-brand-gradient-soft"
      />
      <Container>
        <SectionHeader
          as="h1"
          number="01"
          label="Legal record"
          headline="Privacy Policy"
          lede={`Last updated: ${LAST_UPDATED}`}
        />

        <div className="mt-16 space-y-10">
          <LegalBlock number="01" title="Introduction">
            <LegalBody>
              ASTA Health Tech Corporation (&ldquo;ASTA&rdquo;, &ldquo;we&rdquo;,
              &ldquo;our&rdquo;) is committed to protecting the privacy of individuals
              who interact with our platform, website, and services. This Privacy Policy
              explains what information we collect, how we use it, and the rights
              available to you.
            </LegalBody>
          </LegalBlock>

          <LegalBlock number="02" title="Information We Collect">
            <LegalBody>
              When you interact with our website or request a product walkthrough,
              we may collect:
            </LegalBody>
            <LegalList
              items={[
                "Contact information (name, email address, phone number)",
                "Professional information (hospital or institution name, role or title)",
                "Usage data (browser type, pages visited, session duration)",
                "Communication records (inquiry form submissions, email exchanges)",
              ]}
            />
            <LegalBody>
              We do not collect patient data, clinical records, or protected health
              information through this website.
            </LegalBody>
          </LegalBlock>

          <LegalBlock number="03" title="Platform Data Handling">
            <LegalBody>
              ASTA&rsquo;s clinical intelligence platform reads numerical vital signs
              from bedside monitor displays only. The platform:
            </LegalBody>
            <LegalList
              items={[
                "Captures numerical display data only — no patient imagery is collected, stored, or transmitted",
                "Processes vital sign numerics to support clinical alerting workflows",
                "Does not store personal patient biometrics, facial data, or video recordings",
              ]}
            />
            <LegalBody>
              Data governance within hospital deployments is subject to a separate
              data processing agreement with the institution.
            </LegalBody>
          </LegalBlock>

          <LegalBlock number="04" title="How We Use Information">
            <LegalBody>We use the information we collect to:</LegalBody>
            <LegalList
              items={[
                "Respond to inquiries and coordinate product walkthroughs or deployment conversations",
                "Deliver and continuously improve our platform and services",
                "Send product updates and clinical AI insights (with your consent)",
                "Fulfil our legal and regulatory obligations",
              ]}
            />
          </LegalBlock>

          <LegalBlock number="05" title="Data Sharing">
            <LegalBody>
              We do not sell your personal information. We may share information with:
            </LegalBody>
            <LegalList
              items={[
                "Technology service providers (cloud infrastructure, communications platforms) under data processing agreements",
                "Government or regulatory authorities when required by applicable law",
              ]}
            />
          </LegalBlock>

          <LegalBlock number="06" title="Your Rights under the DPDP Act 2023">
            <LegalBody>
              Under India&rsquo;s Digital Personal Data Protection Act 2023, you have
              the right to:
            </LegalBody>
            <LegalList
              items={[
                "Access the personal data we hold about you",
                "Correct inaccurate or incomplete personal data",
                "Request erasure of personal data, subject to our legal obligations",
                "Nominate a representative to act on your behalf for data management purposes",
                "File a grievance with our data protection team or with the Data Protection Board of India",
              ]}
            />
            <LegalBody>
              To exercise any of these rights, contact us using the details below.
            </LegalBody>
          </LegalBlock>

          <LegalBlock number="07" title="Data Retention">
            <LegalBody>
              We retain your personal information only as long as necessary for the
              purposes described in this policy, or as required by applicable law.
              Inquiry and communication records are typically retained for up to
              three years.
            </LegalBody>
          </LegalBlock>

          <LegalBlock number="08" title="Security">
            <LegalBody>
              We implement technical and organisational measures appropriate to the
              nature of the data we process, including encryption in transit and at
              rest, access controls, and secure communication protocols. No transmission
              over the internet is entirely secure; however, we take reasonable steps
              to protect your information.
            </LegalBody>
          </LegalBlock>

          <LegalBlock number="09" title="Cookies and Tracking">
            <LegalBody>
              Our website may use cookies and similar technologies for analytics and
              performance monitoring. You may control cookie preferences through your
              browser settings.
            </LegalBody>
          </LegalBlock>

          <LegalBlock number="10" title="Changes to This Policy">
            <LegalBody>
              We may update this Privacy Policy from time to time. We will note the
              revised date at the top of this page. Continued use of our website
              following any updates constitutes acceptance of the revised policy.
            </LegalBody>
          </LegalBlock>

          <LegalBlock number="11" title="Contact">
            <LegalBody>
              For privacy-related questions, data access requests, or to exercise
              your rights under the DPDP Act 2023:
            </LegalBody>
            <LegalBody>
              <strong className="font-semibold text-ink">
                ASTA Health Tech Corporation
              </strong>
              <br />
              {contactMain.address.body}
              <br />
              Email: <TextLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</TextLink>
            </LegalBody>
          </LegalBlock>
        </div>

        <SectionEnd label="End of section" />
      </Container>
    </section>
  );
}
