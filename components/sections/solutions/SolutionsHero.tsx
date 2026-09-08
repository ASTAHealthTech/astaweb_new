"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { LedgerRow } from "@/components/ui/LedgerRow";
import { Reveal } from "@/components/ui/Reveal";
import { solutionsHero } from "@/content/solutions";
import { sentenceCase } from "@/lib/motion";
import { Pedestal } from "@/components/pedestal/Pedestal";
import { Panel, Segmented, Toggle } from "@/components/pedestal/Controls";
import { LiveReadout } from "@/components/pedestal/LiveReadout";
import { pedestal, type PedestalControls } from "@/lib/scene/pedestal";

/**
 * §1 — the escalation switchboard, on the pedestal. Set the severity and the
 * shift; watch the alert route to the right people, with its context.
 */
const NAMES = ["Nurse station", "Ward doctor", "On-call doctor", "Rapid response"];
function derive(c: PedestalControls): [string, string, string?][] {
  const sev = Math.round(c.severity);
  const to = sev >= 2 ? (c.night ? [0, 2, 3] : [0, 1, 3]) : sev === 1 ? (c.night ? [0, 2] : [0, 1]) : [0];
  const tone = sev >= 2 ? "#ff5fb0" : sev === 1 ? "#F0B429" : "#34D399";
  return [
    ["severity", ["Low", "Moderate", "High"][sev], tone],
    ["routed to", to.map((i) => NAMES[i]).join(" · ")],
    ["shift", c.night ? "night · on-call covers the ward" : "day · ward doctor on the floor"],
    ["context attached", "trajectory · ranked differentials · next step"],
    ["acknowledge within", sev >= 2 ? "5 min · escalates if silent" : sev === 1 ? "15 min" : "next round"],
    ["audit", "routed, seen, acted — all logged"],
  ];
}

export function SolutionsHero() {
  const c = solutionsHero;
  // re-render the readout when a click flips a bed
  const [, setV] = useState(0);
  useEffect(() => {
    let last = pedestal.version;
    const id = setInterval(() => { if (pedestal.version !== last) { last = pedestal.version; setV(last); } }, 120);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-x-clip pt-28 md:pt-36">
      <Container className="relative">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-6">
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
            <div className="flex items-center gap-3">
              <span aria-hidden className="block h-px w-6 bg-hairline-strong" />
              <span className="font-display text-label tnum text-ink-3">01</span>
              <span className="font-body text-label text-ink-2">{sentenceCase(c.eyebrow)}</span>
            </div>
            <h1 className="mt-5 max-w-[14ch] font-display text-[clamp(2.2rem,3.6vw,3.3rem)] font-medium leading-[1.04] tracking-[-0.03em] text-balance text-ink">
              {c.headline} <span className="text-gradient-brand animate-gradient-pan">{c.headlineAccent}</span>
            </h1>
            <p className="mt-5 max-w-[52ch] font-body text-body-lg text-pretty text-ink-2">{c.sub}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={c.primaryCta.href}>{c.primaryCta.label}</Button>
              <Button href={c.secondaryCta.href} variant="secondary">{c.secondaryCta.label}</Button>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <Pedestal kind="pedestal-switchboard" />
            <p className="machine mt-3 text-ink-3">Role-aware escalation · the right alert, to the right person, with context</p>
          </div>

          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
            <div className="lg:mt-2">
              <Panel title="Controls · one alert, routed">
                <Segmented label="Severity" keyName="severity" options={["Low", "Moderate", "High"]} />
                <Toggle label="Shift" keyName="night" off="Day" on="Night" />
                <LiveReadout derive={derive} />
              </Panel>
            </div>
          </div>
        </div>

        <Reveal className="mt-16">
          <div className="grid grid-cols-2 border-t border-hairline md:grid-cols-4 md:divide-x md:divide-hairline">
            {c.proofRow.map((item, i) => (
              <div key={item.label} className={"py-6 md:px-8 md:first:pl-0 md:last:pr-0 " + (i < 2 ? "max-md:border-b max-md:border-hairline " : "") + (i % 2 === 1 ? "max-md:pl-6" : "max-md:pr-6")}>
                <LedgerRow size="lg" label={item.label} value={item.value} />
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
