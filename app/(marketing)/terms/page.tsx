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
  title: "Terms of Service",
  description:
    "Terms of service for ASTA Health Tech Corporation — conditions governing use of our website and platform.",
  path: "/terms",
  keywords: [
    "ASTA terms of service",
    "website terms",
    "healthtech legal terms",
  ],
});

const LAST_UPDATED = "24 April 2026";

export default function TermsPage() {
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
          headline="Terms of Service"
          lede={`Last updated: ${LAST_UPDATED}`}
        />

        <div className="mt-16 space-y-10">
          <LegalBlock number="01" title="Acceptance of Terms">
            <LegalBody>
              By accessing ASTA&rsquo;s website (astahealthtech.com) or requesting
              access to ASTA&rsquo;s platform, you agree to be bound by these Terms of
              Service. If you are accessing on behalf of an organisation or institution,
              you confirm that you have authority to accept these terms on their behalf.
            </LegalBody>
          </LegalBlock>

          <LegalBlock number="02" title="Description of Service">
            <LegalBody>
              ASTA Health Tech Corporation provides a device-agnostic clinical
              intelligence platform that reads bedside monitor displays, extracts
              structured vital signs, and supports clinical alerting workflows in
              hospital environments. This website is an informational resource; platform
              access is governed by separate institutional agreements.
            </LegalBody>
          </LegalBlock>

          <LegalBlock number="03" title="Healthcare Disclaimer">
            <LegalBody>
              ASTA is a clinical decision support tool. It does not replace professional
              clinical judgment. All clinical decisions remain the sole responsibility of
              the treating clinician and the institution. ASTA&rsquo;s outputs are
              intended to support, not supplant, qualified medical assessment and
              clinical governance.
            </LegalBody>
            <LegalBody>
              Nothing on this website constitutes medical advice. Do not rely on
              information on this site for clinical decision-making.
            </LegalBody>
          </LegalBlock>

          <LegalBlock number="04" title="Acceptable Use">
            <LegalBody>You agree not to:</LegalBody>
            <LegalList
              items={[
                "Access or attempt to access ASTA's platform without authorisation",
                "Use this website or its content for any unlawful purpose",
                "Transmit unsolicited commercial communications through our contact forms",
                "Reproduce, redistribute, or commercially exploit website content without prior written permission",
                "Attempt to reverse engineer, decompile, or extract source code from any ASTA software or platform component",
              ]}
            />
          </LegalBlock>

          <LegalBlock number="05" title="Intellectual Property">
            <LegalBody>
              All content on this website — including text, design, graphics, data, and
              software — is the property of ASTA Health Tech Corporation or its
              licensors. The ASTA name, logo, and platform are protected under applicable
              intellectual property laws. Nothing in these Terms grants you any licence
              to use ASTA&rsquo;s intellectual property except as expressly permitted.
            </LegalBody>
          </LegalBlock>

          <LegalBlock number="06" title="Third-Party Links">
            <LegalBody>
              This website may contain links to third-party websites. ASTA is not
              responsible for the content, accuracy, or privacy practices of any linked
              website. Links do not constitute endorsement.
            </LegalBody>
          </LegalBlock>

          <LegalBlock number="07" title="Disclaimer of Warranties">
            <LegalBody>
              This website and its content are provided &ldquo;as is&rdquo; without
              warranty of any kind, express or implied. ASTA does not warrant that the
              website will be uninterrupted, error-free, or free of harmful components.
            </LegalBody>
          </LegalBlock>

          <LegalBlock number="08" title="Limitation of Liability">
            <LegalBody>
              To the fullest extent permitted by applicable law, ASTA Health Tech
              Corporation shall not be liable for any indirect, incidental, special,
              or consequential damages arising from use of this website or reliance on
              information contained herein, including but not limited to loss of profits,
              data, or goodwill.
            </LegalBody>
          </LegalBlock>

          <LegalBlock number="09" title="Changes to Terms">
            <LegalBody>
              We reserve the right to update these Terms at any time. Revised terms
              will be posted on this page with an updated date. Continued use of the
              website following notice of changes constitutes acceptance of the revised
              terms.
            </LegalBody>
          </LegalBlock>

          <LegalBlock number="10" title="Governing Law and Jurisdiction">
            <LegalBody>
              These Terms are governed by the laws of India. Any disputes arising in
              connection with these Terms shall be subject to the exclusive jurisdiction
              of the courts in Bengaluru, Karnataka, India.
            </LegalBody>
          </LegalBlock>

          <LegalBlock number="11" title="Contact">
            <LegalBody>For legal inquiries or questions regarding these Terms:</LegalBody>
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
