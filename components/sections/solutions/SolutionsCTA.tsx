"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { solutionsCta } from "@/content/solutions";
import { sentenceCase } from "@/lib/motion";

export function SolutionsCTA() {
  const c = solutionsCta;

  return (
    <section className="relative pt-section-sm pb-section">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-brand-gradient-soft" />
      <Container className="relative">
        <div className="mx-auto max-w-[52rem]">
          <SectionHeader
            center
            number="06"
            label={sentenceCase(c.eyebrow)}
            headline={c.heading}
            lede={c.sub}
            headlineMax="max-w-[20ch]"
          />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href={c.primaryCta.href}>{c.primaryCta.label}</Button>
            <Button href={c.secondaryCta.href} variant="secondary">
              {c.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
