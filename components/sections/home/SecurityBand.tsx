import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { security } from "@/content/home";

const PROOF_ACCENTS = [
  { from: "#4F6BFF", to: "#7C5CFF" },
  { from: "#28D7B5", to: "#49C6FF" },
  { from: "#49C6FF", to: "#4F6BFF" },
  { from: "#7C5CFF", to: "#28D7B5" },
] as const;

export function SecurityBand() {
  return (
    <section
      id="security"
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
        <div className="absolute inset-0 hidden dark:block bg-grid-fine bg-[length:44px_44px] opacity-60" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-400/25" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent dark:via-cyan-400/15" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/[0.03] blur-[180px] dark:bg-brand-500/[0.05]" />
        <div className="absolute -left-24 top-0 h-[400px] w-[400px] rounded-full bg-violet-500/[0.03] blur-[120px] dark:bg-violet-500/[0.05]" />
      </div>

      <Container className="relative">

        {/* ══ HEADER (centered) ══ */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-cyan-400" />
              {security.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-h2 md:text-h2-lg font-semibold tracking-[-0.04em] text-balance text-ink dark:text-frost">
              {security.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-body-lg text-pretty text-ink-muted dark:text-frost-muted">
              {security.sub}
            </p>
          </Reveal>
        </div>

        {/* ══ COMPLIANCE BADGE STRIP ══
            3 posture metrics — large mono labels, dividers only, no card boxes
        ══ */}
        <Reveal delay={0.13}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/[0.07]">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(79,107,255,0.50),rgba(124,92,255,0.40),rgba(40,215,181,0.35),transparent)",
              }}
            />
            <div className="grid grid-cols-3 divide-x divide-slate-200/80 dark:divide-white/[0.07]">
              {security.quickMetrics.map((m) => (
                <div
                  key={m.label}
                  className="group relative flex flex-col items-center gap-2 px-6 py-7 text-center"
                >
                  {/* Hover radial glow */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%,${m.color}09,transparent 70%)`,
                    }}
                  />
                  {/* Metric value */}
                  <span
                    className="font-mono text-[2rem] font-bold leading-none tracking-[-0.04em]"
                    style={{
                      background: `linear-gradient(135deg,${m.color},${m.color}bb)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {m.val}
                  </span>
                  {/* Label */}
                  <span className="text-[0.76rem] text-ink-muted dark:text-frost-subtle">
                    {m.label}
                  </span>
                  {/* Verified pill */}
                  <span
                    className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.12em]"
                    style={{ background: `${m.color}12`, color: m.color }}
                  >
                    <span className="h-1 w-1 rounded-full" style={{ background: m.color }} />
                    Verified
                  </span>
                  {/* Bottom hover line */}
                  <div
                    aria-hidden
                    className="absolute inset-x-8 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(to right,transparent,${m.color}55,transparent)`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ══ SECURITY DASHBOARD PANEL ══
            Always-dark terminal panel — scorecard left + audit log right.
            One unified container, no inner card boxes.
        ══ */}
        <Reveal delay={0.17}>
          <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#040810] text-white">
            {/* Panel internal glow blobs */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-brand-500/[0.10] blur-[90px]" />
              <div className="absolute right-0 bottom-0 h-52 w-52 rounded-full bg-teal-400/[0.07] blur-[80px]" />
              <div className="absolute right-1/3 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-violet-500/[0.06] blur-[70px]" />
            </div>
            {/* Top shine */}
            <div
              aria-hidden
              className="absolute inset-x-[5%] top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(255,255,255,0.18),transparent)",
              }}
            />

            {/* macOS-style title bar */}
            <div className="relative flex items-center justify-between border-b border-white/[0.06] bg-white/[0.015] px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                <span className="mx-3 h-4 w-px bg-white/[0.10]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/48">
                  ASTA · Security &amp; Compliance Center
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.10] px-2.5 py-1 font-mono text-[9px] font-bold text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                ALL SYSTEMS SECURE
              </div>
            </div>

            {/* Two-column content */}
            <div className="grid lg:grid-cols-[2fr_3fr]">

              {/* ── Left: Compliance scorecard ── */}
              <div className="relative border-b border-white/[0.06] px-6 py-6 lg:border-b-0 lg:border-r">
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.20em] text-white/48">
                    Compliance Posture
                  </span>
                </div>

                <div className="space-y-5">
                  {security.scorecard.map((item) => (
                    <div key={item.label}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-[0.78rem] font-medium text-white/65">
                          {item.label}
                        </span>
                        <span
                          className="font-mono text-[0.78rem] font-bold"
                          style={{ color: item.color }}
                        >
                          {item.statusLabel ?? `${item.score}%`}
                        </span>
                      </div>
                      {/* Track */}
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${item.score}%`,
                            background: `linear-gradient(90deg,${item.color}70,${item.color})`,
                            boxShadow: `0 0 8px ${item.color}55`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Status footer */}
                <div className="mt-6 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    <span className="text-[0.78rem] font-semibold text-emerald-400">
                      Compliant posture active
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[0.7rem] text-white/48">
                    Consent tracked · Residency options · Audit-ready
                  </p>
                </div>
              </div>

              {/* ── Right: Live audit log ── */}
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.20em] text-white/48">
                      Legal Audit Trail
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-emerald-400/70">
                    Monitoring active
                  </span>
                </div>

                {/* Log entries */}
                <div className="space-y-0 font-mono">
                  {security.auditEvents.map((event, i) => (
                    <div
                      key={event.time}
                      className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.03]"
                    >
                      {/* Timestamp */}
                      <span className="w-16 flex-none text-right text-[10px] text-white/48">
                        {event.time}
                      </span>
                      {/* Status badge */}
                      <span
                        className={`flex-none rounded px-1.5 py-0.5 text-[8px] font-bold uppercase ${
                          event.type === "ok"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-brand-500/15 text-brand-400"
                        }`}
                      >
                        {event.type === "ok" ? "OK" : "INF"}
                      </span>
                      {/* Message */}
                      <span className="min-w-0 flex-1 text-[10px] leading-5 text-white/62">
                        {event.msg}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Log footer */}
                <div className="mt-3 border-t border-white/[0.08] pt-3 font-mono text-[9px] text-white/45">
                  tamper-evident log · immutable · hospital-controlled retention policy
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══ PROOF ITEMS STRIP ══
            4 security pillars — no card boxes, borderless strip with dividers.
            Same pattern as Capabilities feature strip.
        ══ */}
        <Reveal delay={0.22}>
          <div className="relative mt-4 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/[0.07]">
            {/* Top rule */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(40,215,181,0.35),rgba(73,198,255,0.30),transparent)",
              }}
            />
            <div className="grid divide-y divide-slate-100/80 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4 dark:divide-white/[0.06]">
              {security.proofItems.map((item, i) => {
                const acc = PROOF_ACCENTS[i];
                return (
                  <div
                    key={item.title}
                    className="group relative flex flex-col gap-4 overflow-hidden px-6 py-6 transition-colors duration-200 hover:bg-slate-50/70 dark:hover:bg-white/[0.025]"
                  >
                    {/* Hover glow */}
                    <div
                      aria-hidden
                      className="absolute -right-6 -top-6 h-16 w-16 rounded-full blur-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                      style={{ background: acc.from + "22" }}
                    />
                    {/* Icon */}
                    <div
                      className="flex h-10 w-10 flex-none items-center justify-center rounded-xl text-white ring-1 ring-black/[0.04] dark:ring-white/[0.08]"
                      style={{
                        background: `linear-gradient(135deg,${acc.from},${acc.to})`,
                        boxShadow: `0 4px 14px ${acc.from}30`,
                      }}
                    >
                      <Icon name={item.icon} className="h-4 w-4" />
                    </div>
                    {/* Text */}
                    <div className="relative">
                      <h3 className="text-[0.90rem] font-semibold tracking-[-0.02em] text-ink dark:text-frost">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[0.78rem] leading-relaxed text-ink-muted dark:text-frost-subtle">
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
