import { Container } from "@/components/layout/Container";
import { Card, CardBody, CardMeta, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "./ContactForm";
import { contactMain, type ContactInquiryType } from "@/content/contact";

/** Eyebrow row shared by the two columns of the working spread. */
function Eyebrow({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden className="block h-px w-6 bg-hairline-strong" />
      <span className="font-display text-label tnum text-ink-3">{number}</span>
      <span className="font-body text-label text-ink-2">{label}</span>
    </div>
  );
}

/** Ledger row whose value is a live link (mailto:/tel:) — identifiers, not
 * metrics, so no tick. Hover: magenta underline (sanctioned accent use). */
function ChannelRow({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="shrink-0 font-body text-body text-ink-2">{label}</span>
      <span aria-hidden className="-translate-y-1 min-w-6 flex-1 border-b border-dotted border-hairline-strong" />
      <a
        href={href}
        className="font-display text-stat tnum text-ink decoration-accent decoration-2 underline-offset-4 hover:underline"
      >
        {value}
      </a>
    </div>
  );
}

/**
 * §02 + §03 — the working spread. One section visually, two protocol
 * numbers: left "— 02 Contact details" (sticky), right "— 03 Inquiry form"
 * (the page's featured card).
 */
export function ContactSpread({ defaultInquiryType }: { defaultInquiryType: ContactInquiryType }) {
  return (
    <section className="py-section-sm">
      <Container>
        <div className="grid grid-cols-12 items-start gap-x-6 gap-y-14">
          {/* LEFT — contactMain */}
          <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow number="02" label={contactMain.eyebrow} />
              <h2 className="mt-5 font-display text-title text-ink">{contactMain.heading}</h2>
              <p className="mt-3 font-body text-body text-ink-2">{contactMain.sub}</p>

              <div className="mt-8">
                <div className="font-body text-label text-ink-2">{contactMain.channelsTitle}</div>
                <div className="mt-4 flex flex-col gap-3.5">
                  {contactMain.channels.map((channel) => (
                    <ChannelRow
                      key={channel.label}
                      label={channel.label}
                      value={channel.value}
                      href={channel.href}
                    />
                  ))}
                </div>
              </div>

              <Card padded={false} className="mt-8 p-6">
                <CardMeta label="WhatsApp" />
                <CardTitle small>{contactMain.whatsapp.title}</CardTitle>
                <CardBody>{contactMain.whatsapp.body}</CardBody>
                <div className="mt-auto border-t border-hairline pt-4">
                  <Button
                    href={contactMain.whatsapp.href}
                    variant="secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    {contactMain.whatsapp.ctaLabel}
                  </Button>
                </div>
              </Card>

              <div className="mt-8 border-l border-hairline pl-5">
                <div className="font-body text-label text-ink-2">{contactMain.address.eyebrow}</div>
                <div className="mt-2 font-display text-title-sm text-ink">{contactMain.address.company}</div>
                <p className="mt-1 max-w-[36ch] font-body text-body text-ink-2">{contactMain.address.body}</p>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — contactForm */}
          <div id="contact-form" className="col-span-12 scroll-mt-28 lg:col-span-7">
            <Reveal>
              <ContactForm defaultInquiryType={defaultInquiryType} />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
