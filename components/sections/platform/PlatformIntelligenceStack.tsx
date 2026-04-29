import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { platformStack } from "@/content/platform";

export function PlatformIntelligenceStack() {
  return (
    <section
      id="intelligence-stack"
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
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent dark:via-cyan-400/10" />
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-brand-500/[0.03] blur-[150px] dark:bg-brand-500/[0.06]" />
      </div>

      <Container className="relative">

        {/* ══ HEADER ══ */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-cyan-400" />
              {platformStack.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-h2 font-semibold tracking-[-0.04em] text-ink dark:text-frost md:text-h2-lg">
              {platformStack.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-body-lg text-ink-muted dark:text-frost-muted">
              {platformStack.sub}
            </p>
          </Reveal>
        </div>

        {/* ══ SINGLE DARK PANEL ══ */}
        <Reveal delay={0.14}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-brand-400/[0.10] bg-[#040810] text-white shadow-[0_28px_90px_rgba(3,7,18,0.42)]">

            {/* Glow blobs */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-16 top-0 h-64 w-64 rounded-full bg-brand-500/[0.10] blur-[90px]" />
              <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-violet-500/[0.07] blur-[80px]" />
              <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400/[0.04] blur-[70px]" />
            </div>

            {/* Top shine */}
            <div
              aria-hidden
              className="absolute inset-x-[5%] top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(79,107,255,0.50),rgba(124,92,255,0.35),rgba(40,215,181,0.25),transparent)",
              }}
            />

            {/* Panel title bar */}
            <div className="relative flex items-center justify-between border-b border-white/[0.05] px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-white/30">
                  ASTA · Clinical Intelligence Stack
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-2.5 py-1 font-mono text-[9px] font-bold text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                ALL LAYERS LIVE
              </div>
            </div>

            {/* 3 layer columns */}
            <div className="relative grid divide-y divide-white/[0.04] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
              {platformStack.layers.map((layer, i) => (
                <div
                  key={layer.tag}
                  className="relative flex flex-col gap-6 overflow-hidden p-8 lg:p-10"
                >
                  {/* Top color accent line */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[2px]"
                    style={{
                      background: `linear-gradient(to right,${layer.color}70,${layer.colorTo}45,transparent)`,
                    }}
                  />
                  {/* Corner glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -left-8 -top-8 h-36 w-36 rounded-full blur-2xl"
                    style={{ background: layer.color + "14" }}
                  />

                  {/* Icon + tag + live */}
                  <div className="relative flex flex-wrap items-center gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                      style={{
                        background: `linear-gradient(135deg,${layer.color},${layer.colorTo})`,
                        boxShadow: `0 4px 20px ${layer.color}32`,
                      }}
                    >
                      <Icon name={layer.icon} className="h-5 w-5" />
                    </div>
                    <span
                      className="rounded-full px-2.5 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em]"
                      style={{ background: layer.color + "14", color: layer.color }}
                    >
                      {layer.tag}
                    </span>
                    <span className="ml-auto flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-2 py-0.5 font-mono text-[0.58rem] font-bold text-emerald-400">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      Live
                    </span>
                  </div>

                  {/* Text */}
                  <div className="relative">
                    <h3 className="text-[1.1rem] font-semibold leading-snug tracking-[-0.03em] text-frost">
                      {layer.title}
                    </h3>
                    <p className="mt-3 text-[0.82rem] leading-relaxed text-white/50">
                      {layer.body}
                    </p>
                  </div>

                  {/* Step number — bottom right */}
                  <div
                    aria-hidden
                    className="absolute bottom-6 right-7 font-mono text-[2.8rem] font-bold leading-none tracking-tight select-none"
                    style={{ color: layer.color + "10" }}
                  >
                    0{i + 1}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats footer bar */}
            <div className="relative grid grid-cols-3 divide-x divide-white/[0.04] border-t border-white/[0.05]">
              {[
                { value: "98%",  label: "CV extraction accuracy", color: "#4F6BFF" },
                { value: "<2s",  label: "Monitor to clinical output", color: "#28D7B5" },
                { value: "15+",  label: "OEM monitor brands", color: "#7C5CFF" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1 px-6 py-4 text-center">
                  <span
                    className="font-mono text-[1.1rem] font-bold leading-none"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[0.64rem] text-white/30">{stat.label}</span>
                </div>
              ))}
            </div>

          </div>
        </Reveal>

        {/* ══ FOOTER NOTE ══ */}
        <Reveal delay={0.19}>
          <div className="relative mt-4 overflow-hidden rounded-xl border border-slate-200/80 bg-white/50 px-5 py-3.5 dark:border-white/[0.07] dark:bg-white/[0.015]">
            <div className="flex items-center gap-3 text-[0.78rem] text-ink-muted dark:text-frost-subtle">
              <span className="rounded-full border border-cyan-600/25 bg-cyan-50 px-2.5 py-0.5 font-mono text-[0.58rem] font-bold uppercase tracking-[0.14em] text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/[0.08] dark:text-cyan-300">
                Clinical loop
              </span>
              <span>{platformStack.footer}</span>
            </div>
          </div>
        </Reveal>

      </Container>
    </section>
  );
}
