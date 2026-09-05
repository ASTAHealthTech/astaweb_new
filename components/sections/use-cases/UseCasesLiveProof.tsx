"use client";

import { Container } from "@/components/layout/Container";
import { Bezel } from "@/components/ui/Bezel";
import { LiveDot } from "@/components/ui/Card";
import { LedgerRow } from "@/components/ui/LedgerRow";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionEnd, SectionHeader } from "@/components/ui/SectionHeader";
import { useCasesLiveProof } from "@/content/use-cases";
import { sentenceCase } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * B§04 — the page's one dark panel: the public deployment register.
 * The page's single LiveDot lives in the metrics band ("Live"); register
 * rows carry a static neutral dot + the word "Live" (ruling 1: one pulse
 * per page, never per-row). No capture sweep here.
 */

function RowLiveMarker() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-panel-ink-3" />
      <span className="font-body text-label text-panel-ink-2">Live</span>
    </span>
  );
}

export function UseCasesLiveProof() {
  const c = useCasesLiveProof;

  return (
    <section className="mt-section-sm bg-panel py-24 md:py-32">
      <Container>
        <SectionHeader
          dark
          number="04"
          label={sentenceCase(c.eyebrow)}
          headline={c.heading}
          lede={c.sub}
        />

        {/* metrics band */}
        <Reveal className="mt-12">
          <div className="grid grid-cols-2 border-y border-panel-hairline md:grid-cols-4 md:divide-x md:divide-panel-hairline">
            {c.metrics.map((metric, i) => (
              <div
                key={metric.label}
                className={cn(
                  "py-6 md:px-8 md:first:pl-0 md:last:pr-0",
                  i < 2 && "max-md:border-b max-md:border-panel-hairline",
                  i % 2 === 1 ? "max-md:pl-6" : "max-md:pr-6"
                )}
              >
                {metric.value === "Live" ? (
                  <div className="flex flex-col gap-2">
                    <span aria-hidden className="h-px w-6 bg-panel-hairline-strong" />
                    <span className="font-body text-label text-panel-ink-2">{metric.label}</span>
                    <span className="flex items-center gap-3">
                      <LiveDot dark label="" />
                      <span className="font-display text-stat-lg text-panel-ink">Live</span>
                    </span>
                  </div>
                ) : (
                  <LedgerRow
                    dark
                    size="lg"
                    label={metric.label}
                    value={metric.value}
                    tick={metric.value !== "2025"}
                  />
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* hospital ledger */}
        <Reveal className="mt-12">
          <Bezel label="asta — public register" timestamp="2025 — present">
            {/* tick rule — instrument detail, 4px ticks at 80px pitch */}
            <svg aria-hidden className="block w-full text-panel-hairline" height={4}>
              <defs>
                <pattern id="register-ticks" width={80} height={4} patternUnits="userSpaceOnUse">
                  <line x1={0.5} y1={0} x2={0.5} y2={4} stroke="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height={4} fill="url(#register-ticks)" />
            </svg>
            <Reveal stagger>
              {c.hospitals.map((hospital, i) => (
                <RevealItem key={hospital.name}>
                  <div className="relative grid gap-y-2 border-b border-panel-hairline px-6 py-5 transition-colors duration-200 last:border-b-0 hover:bg-panel-ink/5 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
                    <span className="font-display text-label tnum text-panel-ink-3 md:col-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="pr-16 md:col-span-4 md:pr-0">
                      <div className="font-display text-title-sm text-panel-ink">
                        {hospital.name}
                      </div>
                      <div className="mt-1 font-body text-label text-panel-ink-2">
                        {hospital.city}, {hospital.state}
                      </div>
                    </div>
                    <div className="md:col-span-3">
                      <div className="font-body text-label text-panel-ink-2">
                        {hospital.careContext}
                      </div>
                      <div className="mt-1 font-body text-label text-panel-ink-3">
                        {hospital.note}
                      </div>
                    </div>
                    <div className="font-body text-label text-panel-ink-2 md:col-span-3">
                      {hospital.deploymentFit}
                    </div>
                    <div className="max-md:absolute max-md:right-6 max-md:top-5 md:col-span-1 md:justify-self-end">
                      <RowLiveMarker />
                    </div>
                  </div>
                </RevealItem>
              ))}
            </Reveal>
          </Bezel>
        </Reveal>

        <div className="mt-6 flex items-center gap-3">
          <span aria-hidden className="h-px w-6 shrink-0 bg-panel-hairline-strong" />
          <p className="max-w-[62ch] font-body text-label text-panel-ink-3">{c.note}</p>
        </div>

        <SectionEnd dark number="04" />
      </Container>
    </section>
  );
}
