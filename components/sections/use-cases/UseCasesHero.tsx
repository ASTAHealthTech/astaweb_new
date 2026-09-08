"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { LedgerRow } from "@/components/ui/LedgerRow";
import { Reveal } from "@/components/ui/Reveal";
import { useCasesHero } from "@/content/use-cases";
import { sentenceCase } from "@/lib/motion";
import { Pedestal } from "@/components/pedestal/Pedestal";
import { useEffect, useState } from "react";
import { Panel, Segmented } from "@/components/pedestal/Controls";
import { LiveReadout } from "@/components/pedestal/LiveReadout";
import { pedestal, type PedestalControls } from "@/lib/scene/pedestal";

/**
 * §1 — hub and spokes, on the pedestal. The central hospital and every place
 * ASTA runs from it. Click a spoke, or pick it below; the readout follows.
 */
const SPOKE_INFO: [string, string, string, string][] = [
  ["General ward", "the monitors already at every bed", "continuous oversight · NEWS2 · early escalation", "no new fleet"],
  ["ICU / HCU", "the highest-acuity beds", "second set of eyes · trajectory before threshold", "works beside existing systems"],
  ["Peripheral centre", "a small centre, the same intelligence", "the hub's clinicians see the edge in real time", "one operational model"],
  ["Hospital-at-home", "a monitor in a living room", "the ward view extends to the home", "same alerts, same routing"],
  ["Teaching hospital", "wards that also teach and publish", "pattern review · research output · training", "institutional differentiation"],
];
function derive(c: PedestalControls): [string, string, string?][] {
  const s = SPOKE_INFO[c.spoke] ?? SPOKE_INFO[0];
  return [
    ["site", s[0], "#F6F2F8"],
    ["what it is", s[1]],
    ["what ASTA adds", s[2], "#8A4FE0"],
    ["operating model", s[3], "#F09030"],
    ["data path", "site → hub · numerics only"],
  ];
}

export function UseCasesHero() {
  const c = useCasesHero;
  // a click on a spoke selects it in 3D; mirror that into the segmented control
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
            <h1 className="mt-5 font-display text-[clamp(2.1rem,3.4vw,3.1rem)] font-medium leading-[1.04] tracking-[-0.03em] text-balance text-ink">
              {c.headline} <span className="text-gradient-brand animate-gradient-pan">{c.headlineAccent}</span>
            </h1>
            <p className="mt-5 max-w-[52ch] font-body text-body-lg text-pretty text-ink-2">{c.sub}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={c.primaryCta.href}>{c.primaryCta.label}</Button>
              <Button href={c.secondaryCta.href} variant="secondary">{c.secondaryCta.label}</Button>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <Pedestal kind="pedestal-hub" hint="click a site · drag · zoom · 2×click" />
            <p className="machine mt-3 text-ink-3">One intelligence layer · the central hospital and the care edge</p>
          </div>

          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
            <div className="lg:mt-2">
              <Panel title="Controls · where ASTA runs">
                <Segmented key={pedestal.controls.spoke} label="Site" keyName="spoke" options={["Ward", "ICU", "Peripheral", "Home", "Teaching"]} />
                <LiveReadout derive={derive} />
              </Panel>
            </div>
          </div>
        </div>

        <Reveal className="mt-16">
          <div className="grid grid-cols-2 border-t border-hairline md:grid-cols-4 md:divide-x md:divide-hairline">
            {c.proofRow.map((item, i) => (
              <div key={item.label} className={"py-6 md:px-8 md:first:pl-0 md:last:pr-0 " + (i < 2 ? "max-md:border-b max-md:border-hairline " : "") + (i % 2 === 1 ? "max-md:pl-6" : "max-md:pr-6")}>
                <LedgerRow size="lg" label={item.label} value={item.value} tick={item.value !== "0"} />
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
