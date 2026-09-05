"use client";

import { Container } from "@/components/layout/Container";
import { Card, CardBody, CardMeta, CardTitle } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { platformDeploymentArchitecture } from "@/content/platform";
import { DrawnRule } from "./DrawnRule";

/**
 * §6 — "— 06 Deployment architecture". Horizontal-spine stage row (the
 * sanctioned 20px ink line icons sit on the drawn hairline; desktop only),
 * then four text-first principle cards (no icons), then the load-bearing
 * footer sentence as a full-width callout ledger row. No accent.
 *
 * Eyebrow is hardcoded in sentence case: lib/motion's sentenceCase would
 * corrupt "architecture" via its protected "IT" token.
 */
export function PlatformDeploymentArchitecture() {
  const c = platformDeploymentArchitecture;
  return (
    <section className="py-section-sm">
      <Container>
        <SectionHeader
          number="06"
          label="Deployment architecture"
          headline={c.heading}
          lede={c.sub}
        />

        {/* 6a — stages on a horizontal spine */}
        <div className="relative mt-14">
          <DrawnRule className="absolute inset-x-0 top-2.5 hidden h-px bg-hairline lg:block" />
          <Reveal stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {c.stages.map((s, i) => (
              <RevealItem key={s.title}>
                <div className="relative">
                  <div className="flex items-center">
                    <span className="relative z-10 inline-flex bg-paper pr-2 text-ink-2">
                      <Icon name={s.icon} />
                    </span>
                    <span
                      aria-hidden
                      className="hidden h-2 w-px bg-hairline-strong lg:inline-block"
                    />
                  </div>
                  <div className="mt-5 font-display text-label tnum text-ink-3">{`0${i + 1}`}</div>
                  <h3 className="mt-2 font-display text-title-sm text-ink">{s.title}</h3>
                  <p className="mt-3 font-body text-body text-ink-2">{s.body}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>

        {/* 6b — principles (text-first, no icons) */}
        <Reveal stagger className="mt-20 grid auto-rows-fr items-stretch gap-6 md:grid-cols-2">
          {c.principles.map((p, i) => (
            <RevealItem key={p.title} className="h-full">
              <Card>
                <CardMeta number={`0${i + 1}`} />
                <CardTitle>{p.title}</CardTitle>
                <CardBody>{p.body}</CardBody>
              </Card>
            </RevealItem>
          ))}
        </Reveal>

        {/* Footer callout — load-bearing sentence */}
        <Reveal className="mt-20">
          <div className="border-y border-hairline px-6 py-10 text-center">
            <p className="mx-auto max-w-measure font-body text-body-lg text-pretty text-ink">
              {c.footer}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
