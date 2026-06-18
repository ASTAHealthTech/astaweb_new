import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { platformReasoningLayer } from "@/content/platform";

const PILLAR_NUMS = ["01", "02", "03", "04"];

export function PlatformReasoningLayer() {
  return (
    <section className="relative overflow-hidden bg-canvas py-24 md:py-32 dark:bg-[#060816]">
      {/* ── BG ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,22,40,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(10,22,40,0.03) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="absolute inset-0 hidden bg-grid-fine bg-[length:44px_44px] opacity-60 dark:block" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-400/25" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent dark:via-white/[0.04]" />
        <div className="absolute -left-24 top-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/[0.03] blur-[130px] dark:bg-violet-500/[0.05]" />
      </div>

      <Container className="relative">

        {/* ══ HEADER ══ */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-cyan-400" />
              {platformReasoningLayer.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-h2 font-semibold tracking-[-0.04em] text-ink dark:text-frost md:text-h2-lg">
              {platformReasoningLayer.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-body-lg text-ink-muted dark:text-frost-muted">
              {platformReasoningLayer.sub}
            </p>
          </Reveal>
        </div>

        {/* ══ SINGLE DARK PANEL ══ */}
        <Reveal delay={0.14}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#040810] text-white">

            {/* Glow */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -right-12 top-0 h-48 w-48 rounded-full bg-brand-500/[0.10] blur-[80px]" />
              <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-violet-500/[0.06] blur-[70px]" />
            </div>

            {/* Top shine */}
            <div
              aria-hidden
              className="absolute inset-x-[5%] top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(79,107,255,0.45),rgba(124,92,255,0.30),transparent)",
              }}
            />

            <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] lg:divide-x lg:divide-white/[0.05]">

              {/* Left — 4 compact pillars 2×2 */}
              <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.05]">
                {platformReasoningLayer.pillars.map((pillar, i) => (
                  <div key={pillar.title} className="relative flex flex-col gap-5 p-7">
                    <div
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[2px]"
                      style={{
                        background: `linear-gradient(to right,${pillar.color}55,transparent)`,
                      }}
                    />
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-lg font-mono text-[0.68rem] font-bold"
                      style={{ background: pillar.color + "14", color: pillar.color }}
                    >
                      {PILLAR_NUMS[i]}
                    </span>
                    <div>
                      <h3 className="text-[0.95rem] font-semibold tracking-[-0.02em] text-frost">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-[0.78rem] leading-relaxed text-white/45">
                        {pillar.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right — what PPLM changes */}
              <div className="flex flex-col gap-4 p-7">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/28">
                    What changes with PPLM
                  </span>
                </div>

                {/* Without */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
                  <div className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white/35">
                    Without trajectory reasoning
                  </div>
                  <div className="space-y-2.5">
                    {[
                      "Alerts fire only when a single value crosses a threshold",
                      "No context on how the pattern shifted over time",
                      "Raw alert without evidence or reasoning",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2.5 text-[0.76rem] leading-snug text-white/35">
                        <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-white/18" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ASTA PPLM */}
                <div className="rounded-xl border border-brand-400/25 bg-brand-500/[0.10] p-5">
                  <div className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-brand-300">
                    ASTA PPLM
                  </div>
                  <div className="space-y-2.5">
                    {[
                      "Interprets trajectory change across continuous vital windows",
                      "Surfaces deterioration context before threshold breach",
                      "Evidence-linked output at the point of escalation",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2.5 text-[0.78rem] leading-snug text-white/62">
                        <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-brand-400" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-auto text-[0.72rem] leading-relaxed text-white/35">
                  {platformReasoningLayer.footer}
                </p>
              </div>

            </div>
          </div>
        </Reveal>

      </Container>
    </section>
  );
}
