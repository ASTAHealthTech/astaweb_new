import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { contactHero } from "@/content/contact";

/**
 * — 01 Contact ASTA. Short, functional, pure type — no plate, no photo.
 * Server-rendered; the headline's final word carries the brand gradient
 * and one soft radial glow sits behind the section.
 */
export function ContactHero() {
  const words = contactHero.headline.split(" ");
  const accent = words.pop() ?? "";
  const lead = words.join(" ");

  return (
    <section className="relative pb-16 pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-brand-gradient-soft" />
      <Container>
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-3">
              <span aria-hidden className="block h-px w-6 bg-hairline-strong" />
              <span className="font-display text-label tnum text-ink-3">01</span>
              <span className="font-body text-label text-ink-2">{contactHero.eyebrow}</span>
            </div>

            <h1 className="mt-5 max-w-[16ch] font-display text-display-1 text-balance text-ink">
              {lead}{" "}
              <span className="text-gradient-brand animate-gradient-pan">{accent}</span>
            </h1>

            <p className="mt-5 max-w-measure font-body text-body-lg text-pretty text-ink-2">
              {contactHero.sub}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={contactHero.primaryCta.href}>{contactHero.primaryCta.label}</Button>
              <Button
                href={contactHero.secondaryCta.href}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {contactHero.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
        <div aria-hidden className="mt-16 h-px w-full bg-hairline" />
      </Container>
    </section>
  );
}
