"use client";

import { hero, deployments } from "@/content/home";
import { sentenceCase } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { LedgerRow } from "@/components/ui/LedgerRow";
import { Container } from "@/components/layout/Container";
import { Aurora } from "@/components/visual/Aurora";
import { HeroInstrument } from "./HeroInstrument";
import { WalkthroughLink } from "./WalkthroughLightbox";

/**
 * §01 — "The Reading", lit by the brand aurora. The logo gradient is the
 * hero's light source (WebGL silk); the accent phrase carries the gradient
 * as type; the instrument floats on glass to the right. Bottom edge runs a
 * marquee of the live hospital deployments.
 */

function splitHeadline(): [string, string] {
  const full = `${hero.headline} ${hero.headlineAccent}`;
  const idx = full.indexOf("signs");
  if (idx === -1) return [hero.headline, hero.headlineAccent];
  const cut = idx + "signs".length;
  return [full.slice(0, cut), full.slice(cut + 1)];
}

function splitProof(s: string): { label: string; value?: string } {
  const m = s.match(/^([\d<>+%./]+\S*)\s+(.*)$/);
  if (m) return { label: m[2], value: m[1] };
  return { label: s };
}

export function Hero() {
  const [line1, line2] = splitHeadline();
  const hospitals = deployments.items.map((d) => `${d.name} — ${d.city}`);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* ── The brand's light: silk aurora in amber → magenta → violet ── */}
      <Aurora className="absolute inset-0" />
      {/* melt the aurora into the page ground */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-paper"
      />

      <div className="relative flex flex-1 items-center pb-16 pt-28 lg:pt-32">
        <Container wide>
          <div className="grid grid-cols-1 items-center gap-x-8 gap-y-14 lg:grid-cols-12">
            {/* LEFT — server-rendered reading matter */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3">
                <span aria-hidden className="block h-px w-6 bg-hairline-strong" />
                <span className="font-display text-label tnum text-ink-3">01</span>
                <span className="font-body text-label text-ink-2">
                  {sentenceCase(hero.eyebrow)}
                </span>
              </div>

              <h1 className="mt-6 max-w-[14ch] font-display text-display-1 text-balance text-ink">
                {line1}
                <br />
                <span className="text-gradient-brand animate-gradient-pan">
                  {line2}
                </span>
              </h1>

              <p className="mt-6 max-w-[52ch] font-body text-body-lg text-pretty text-ink-2">
                {hero.sub}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
                <Button href={hero.secondaryCta.href} variant="secondary">
                  {hero.secondaryCta.label}
                </Button>
              </div>

              <div className="mt-12 border-t border-hairline pt-2">
                {hero.microProof.map((s) => {
                  const { label, value } = splitProof(s);
                  return <LedgerRow key={s} label={label} value={value} />;
                })}
              </div>
            </div>

            {/* RIGHT — the instrument, floating on glass */}
            <div className="lg:col-span-6 lg:pl-8">
              <div className="rounded-card shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7),0_0_80px_rgba(222,37,136,0.08)] backdrop-blur-sm">
                <HeroInstrument />
              </div>
              <div className="mt-5">
                <WalkthroughLink />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Bottom edge: live-deployment marquee ── */}
      <div className="relative border-t border-hairline bg-paper/60 py-3.5 backdrop-blur-md">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-10 pr-10">
            {[...hospitals, ...hospitals].map((h, i) => (
              <span
                key={`${h}-${i}`}
                className="flex items-center gap-2.5 whitespace-nowrap font-body text-label text-ink-3"
              >
                <span aria-hidden className="h-1 w-1 rounded-full bg-accent/70" />
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
