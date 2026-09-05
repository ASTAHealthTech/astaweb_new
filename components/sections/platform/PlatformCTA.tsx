"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEnd, SectionHeader } from "@/components/ui/SectionHeader";
import { sentenceCase } from "@/lib/motion";
import { platformCta } from "@/content/platform";

/**
 * §8 — "— 08 Platform walkthrough". Back on paper ground; centered column.
 * Closes with the standard SectionEnd rule (only the global Footer says
 * "End of document").
 */
export function PlatformCTA() {
  const c = platformCta;
  return (
    <section className="relative py-section-sm">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-brand-gradient-soft" />
      <Container>
        <div className="mx-auto max-w-[720px]">
          <SectionHeader
            number="08"
            label={sentenceCase(c.eyebrow)}
            headline={c.heading}
            lede={c.sub}
            center
          />
          <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-4 max-sm:flex-col">
            <Button href={c.primaryCta.href}>{c.primaryCta.label}</Button>
            <Button href={c.secondaryCta.href} variant="secondary">
              {c.secondaryCta.label}
            </Button>
          </Reveal>
        </div>
        <SectionEnd number="08" />
      </Container>
    </section>
  );
}
