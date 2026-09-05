"use client";

import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Bezel } from "@/components/ui/Bezel";
import { LedgerTick } from "@/components/ui/LedgerTick";
import { EvidenceChip } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { sentenceCase } from "@/lib/motion";
import { platformValidation } from "@/content/platform";
import { DrawnRule } from "./DrawnRule";

/**
 * §7 — "— 07 Validation & benchmarks". The page's ONE dark instrument
 * panel. Metrics live in a Bezel with a STATIC timestamp and neutral chrome
 * dot; values run A2 ledger ticks; proof numerics wear ink-only evidence
 * chips. No accent anywhere in this section.
 */

// Design-owned segmentation of the verbatim proof strings so bare numerics
// wear evidence chips ("98% CV", "15+ OEM", "100M+", "10+", "25").
const PROOF_SEGMENTS: (string | { chip: string })[][] = [
  [{ chip: "98% CV" }, " accuracy across ", { chip: "15+ OEM" }, " monitor brands"],
  [{ chip: "100M+" }, " labeled monitor frames"],
  [{ chip: "10+" }, " hospital deployments and ", { chip: "25" }, " live devices"],
];

function ProofCell({ segments, fallback }: { segments?: (string | { chip: string })[]; fallback: string }) {
  if (!segments) {
    return <>{fallback}</>;
  }
  return (
    <>
      {segments.map((seg, i): ReactNode =>
        typeof seg === "string" ? (
          <span key={i}>{seg}</span>
        ) : (
          <EvidenceChip key={i} dark className="mx-0.5 align-baseline">
            {seg.chip}
          </EvidenceChip>
        )
      )}
    </>
  );
}

export function PlatformValidation() {
  const c = platformValidation;
  return (
    <section className="bg-panel py-section-sm">
      <Container>
        <SectionHeader
          number="07"
          label={sentenceCase(c.eyebrow)}
          headline={c.heading}
          lede={c.sub}
          dark
        />

        {/* 7a — metrics bezel */}
        <Reveal className="mt-14">
          <Bezel label="platform.validation" timestamp="2026-09-05 · 11:42:07">
            <div className="grid grid-cols-1 gap-px bg-panel-hairline sm:grid-cols-2 lg:grid-cols-3">
              {c.metrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-panel p-8 transition-colors duration-200 hover:bg-panel-surface"
                >
                  <div className="font-display text-stat-lg tnum text-panel-ink">
                    <LedgerTick value={m.value} />
                  </div>
                  <div className="mt-2 font-body text-label text-panel-ink-2">{m.label}</div>
                  <div className="mt-1 font-body text-label font-normal text-panel-ink-3">
                    {m.note}
                  </div>
                </div>
              ))}
            </div>
          </Bezel>
        </Reveal>

        {/* 7b — proof table */}
        <Reveal className="mt-16">
          <Bezel label="review.notes">
            <div className="p-6 md:p-8">
              <div className="hidden gap-8 border-b border-panel-hairline-strong pb-3 md:grid md:grid-cols-[180px_1fr_1fr]">
                <span className="font-body text-label text-panel-ink-3">Dimension</span>
                <span className="font-body text-label text-panel-ink-3">Proof</span>
                <span className="font-body text-label text-panel-ink-3">Implication</span>
              </div>
              {c.rows.map((row, i) => (
                <div key={row.dimension} className="relative">
                  {i > 0 && (
                    <DrawnRule
                      delay={i * 0.08}
                      className="absolute inset-x-0 top-0 h-px bg-panel-hairline"
                    />
                  )}
                  <div className="grid gap-3 py-6 md:grid-cols-[180px_1fr_1fr] md:gap-8">
                    <h3 className="font-display text-stat text-panel-ink">{row.dimension}</h3>
                    <p className="font-body text-body text-panel-ink-2">
                      <ProofCell segments={PROOF_SEGMENTS[i]} fallback={row.proof} />
                    </p>
                    <p className="font-body text-body text-panel-ink-3">{row.implication}</p>
                  </div>
                </div>
              ))}
            </div>
          </Bezel>
        </Reveal>

        <div className="mt-12 border-t border-panel-hairline pt-6">
          <p className="max-w-measure font-body text-body text-pretty text-panel-ink-2">
            {c.footer}
          </p>
        </div>
      </Container>
    </section>
  );
}
