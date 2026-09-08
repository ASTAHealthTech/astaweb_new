"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { LedgerRow } from "@/components/ui/LedgerRow";
import { platformHero } from "@/content/platform";
import { Pedestal } from "@/components/pedestal/Pedestal";
import { Panel, Slider, Toggle } from "@/components/pedestal/Controls";
import { LiveReadout } from "@/components/pedestal/LiveReadout";
import type { PedestalControls } from "@/lib/scene/pedestal";
import { HeroEyebrow } from "./HeroEyebrow";

/**
 * §1 — the platform, on the pedestal.
 *
 * The PPLM itself, solid, operable: drag it, take it apart, and move the
 * patient's heart rate to watch the readings, the pulse through the network
 * and the forecast respond. The copy is the existing platform copy.
 */
function derive(c: PedestalControls): [string, string, string?][] {
  const hr = c.hr;
  const risk = hr < 100 ? ["Low", "#34D399"] : hr < 120 ? ["Moderate", "#F0B429"] : ["High", "#F0564A"];
  const next15 = (hr + (hr - 92) * 0.12).toFixed(1);
  const next30 = (hr + (hr - 92) * 0.22).toFixed(1);
  return [
    ["current risk", risk[0], risk[1]],
    ["heart rate · recorded", `${hr} bpm`, "#F09030"],
    ["+15 min · model", `${next15} bpm`, "#8A4FE0"],
    ["+30 min · model", `${next30} bpm`, "#8A4FE0"],
    ["reviewers", c.deep ? "5 · Pulse · Aegis · Atlas · Nyra · Lumen" : "1 · Lumen"],
    ["returns in", c.deep ? "5–15 min · background" : "seconds"],
  ];
}

export function PlatformHero() {
  const c = platformHero;
  return (
    <section className="relative overflow-x-clip pb-section-sm pt-28 md:pt-36">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-6">
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
            <HeroEyebrow number="01" label={c.eyebrow} />
            <h1 className="mt-6 font-display text-[clamp(2.2rem,3.6vw,3.3rem)] font-medium leading-[1.04] tracking-[-0.03em] text-ink">
              {c.headline}
              <br />
              <span className="text-gradient-brand animate-gradient-pan">{c.headlineAccent}</span>
            </h1>
            <p className="mt-6 max-w-[52ch] font-body text-body-lg text-pretty text-ink-2">{c.sub}</p>
            <div className="mt-8 flex flex-wrap gap-4 max-md:flex-col">
              <Button href={c.primaryCta.href}>{c.primaryCta.label}</Button>
              <Button href={c.secondaryCta.href} variant="secondary">{c.secondaryCta.label}</Button>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <Pedestal kind="pedestal-model" />
            <p className="machine mt-3 text-ink-3">Physiological Pattern Learning Model · readings → network → council → forecast</p>
          </div>

          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
            <div className="lg:mt-2">
              <Panel title="Controls · the model, live">
                <Slider label="Patient heart rate" keyName="hr" min={60} max={140} unit="bpm" />
                <Toggle label="Review mode" keyName="deep" off="Rapid" on="Deep" />
                <LiveReadout derive={derive} />
              </Panel>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-hairline pt-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {c.proofRow.map((r) => (
              <LedgerRow key={r.label} size="lg" label={r.label} value={r.value} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
