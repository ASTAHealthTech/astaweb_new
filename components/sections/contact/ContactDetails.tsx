import { Container } from "@/components/layout/Container";
import { SectionHeader, SectionEnd } from "@/components/ui/SectionHeader";
import { Card, CardBody, CardMeta, CardTitle } from "@/components/ui/Card";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { contactDetails } from "@/content/contact";

/**
 * — 06 Direct contact details. The primary email set large, then three
 * structurally identical email-lane cards with mailto ledger footers.
 */
export function ContactDetails() {
  return (
    <section className="py-section">
      <Container>
        <SectionHeader
          number="06"
          label={contactDetails.eyebrow}
          headline={contactDetails.heading}
          lede={contactDetails.sub}
        />

        <div className="mt-6">
          <a
            href={`mailto:${contactDetails.primaryEmail}`}
            className="break-words font-display text-display-2 text-ink decoration-accent decoration-2 underline-offset-8 hover:underline"
          >
            {contactDetails.primaryEmail}
          </a>
        </div>

        <Reveal stagger className="mt-12 grid auto-rows-fr items-stretch gap-6 md:grid-cols-3">
          {contactDetails.channels.map((channel, i) => (
            <RevealItem key={channel.title} className="h-full">
              <Card>
                <CardMeta number={String(i + 1).padStart(2, "0")} label="Email lane" />
                <CardTitle small>{channel.title}</CardTitle>
                <CardBody>{channel.body}</CardBody>
                <div className="mt-auto border-t border-hairline pt-4">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="shrink-0 font-body text-label text-ink-2">Write to</span>
                    <span
                      aria-hidden
                      className="-translate-y-1 min-w-6 flex-1 border-b border-dotted border-hairline-strong"
                    />
                    <a
                      href={`mailto:${channel.email}`}
                      className="break-all font-display text-stat tnum text-ink decoration-accent decoration-2 underline-offset-4 hover:underline"
                    >
                      {channel.email}
                    </a>
                  </div>
                </div>
              </Card>
            </RevealItem>
          ))}
        </Reveal>

        <SectionEnd />
      </Container>
    </section>
  );
}
