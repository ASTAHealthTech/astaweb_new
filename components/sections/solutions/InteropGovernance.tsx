import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { interopGovernance } from "@/content/solutions";

const ITEM_ACCENTS = [
  { from: "#4F6BFF", to: "#7C5CFF" },
  { from: "#28D7B5", to: "#49C6FF" },
  { from: "#7C5CFF", to: "#4F6BFF" },
  { from: "#49C6FF", to: "#28D7B5" },
  { from: "#28D7B5", to: "#7C5CFF" },
  { from: "#4F6BFF", to: "#49C6FF" },
] as const;

export function InteropGovernance() {
  return (
    <section
      id="governance"
      className="relative overflow-hidden bg-canvas py-24 md:py-32 dark:bg-[#060816]"
    >
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
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/[0.03] blur-[150px] dark:bg-brand-500/[0.05]" />
        <div className="absolute -right-32 top-0 h-[350px] w-[350px] rounded-full bg-teal-400/[0.02] blur-[120px] dark:bg-teal-400/[0.04]" />
      </div>

      <Container className="relative">

        {/* ══ HEADER ══ */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-cyan-400" />
              {interopGovernance.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-h2 font-semibold tracking-[-0.04em] text-ink dark:text-frost md:text-h2-lg">
              {interopGovernance.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-body-lg text-ink-muted dark:text-frost-muted">
              {interopGovernance.sub}
            </p>
          </Reveal>
        </div>

        {/* ══ GOVERNANCE GRID ══ */}
        <Reveal delay={0.14}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/[0.07]">
            {/* Top rule */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(79,107,255,0.50),rgba(40,215,181,0.40),rgba(73,198,255,0.30),transparent)",
              }}
            />

            <div className="grid divide-y divide-slate-100/80 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-3 dark:divide-white/[0.06]">
              {interopGovernance.items.map((item, i) => {
                const acc = ITEM_ACCENTS[i];
                return (
                  <div
                    key={item.title}
                    className="group relative flex flex-col gap-5 overflow-hidden px-8 py-8 transition-colors duration-200 hover:bg-slate-50/70 dark:hover:bg-white/[0.025]"
                  >
                    {/* Row divider for second row in 3-col grid */}
                    {i >= 3 && (
                      <div className="absolute inset-x-0 top-0 h-px bg-slate-100/80 dark:bg-white/[0.06]" />
                    )}
                    {/* Hover glow */}
                    <div
                      aria-hidden
                      className="absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: acc.from + "22" }}
                    />

                    {/* Icon + badge row */}
                    <div className="flex items-center justify-between">
                      <div
                        className="flex h-12 w-12 flex-none items-center justify-center rounded-xl text-white"
                        style={{
                          background: `linear-gradient(135deg,${acc.from},${acc.to})`,
                          boxShadow: `0 4px 16px ${acc.from}30`,
                        }}
                      >
                        <Icon name={item.icon} className="h-5 w-5" />
                      </div>
                      <span
                        className="rounded-full px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.10em]"
                        style={{ background: acc.from + "14", color: acc.from }}
                      >
                        {item.badge}
                      </span>
                    </div>

                    {/* Text */}
                    <div className="relative">
                      <h3 className="text-[0.95rem] font-semibold tracking-[-0.02em] text-ink dark:text-frost">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[0.80rem] leading-relaxed text-ink-muted dark:text-frost-subtle">
                        {item.body}
                      </p>
                    </div>

                    {/* Bottom hover accent */}
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(to right,transparent,${acc.from}45,${acc.to}35,transparent)`,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

      </Container>
    </section>
  );
}
