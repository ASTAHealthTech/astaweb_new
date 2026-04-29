import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { outcomes } from "@/content/home";

/* ─── Accent colours per outcome ───────────────────────────── */
const ACCENTS = [
  { from: "#4F6BFF", to: "#7C5CFF", glow: "rgba(79,107,255,0.20)"  },
  { from: "#28D7B5", to: "#49C6FF", glow: "rgba(40,215,181,0.18)"  },
  { from: "#7C5CFF", to: "#49C6FF", glow: "rgba(124,92,255,0.18)"  },
  { from: "#49C6FF", to: "#28D7B5", glow: "rgba(73,198,255,0.16)"  },
] as const;

/* ─── Impact numbers ────────────────────────────────────────── */
const STATS = [
  { val: "₹0",    sub: "CAPEX",  label: "No hardware refresh required",       color: "#4F6BFF" },
  { val: "24/7",  sub: "",       label: "Continuous signal coverage",          color: "#28D7B5" },
  { val: "100%",  sub: "",       label: "Fully auditable patient data trail",  color: "#7C5CFF" },
  { val: "<2s",   sub: "",       label: "Signal-to-interpretation latency",    color: "#49C6FF" },
] as const;

/* ─── Section ───────────────────────────────────────────────── */
export function Outcomes() {
  return (
    <section
      id="outcomes"
      className="relative overflow-hidden bg-canvas py-24 md:py-32 dark:bg-[#060816]"
    >
      {/* ── BG ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Light grid */}
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,22,40,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(10,22,40,0.03) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        {/* Dark grid */}
        <div className="absolute inset-0 hidden dark:block bg-grid-fine bg-[length:44px_44px] opacity-60" />
        {/* Dividers */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-400/25" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent dark:via-white/[0.06]" />
        {/* Glows */}
        <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand-500/[0.04] blur-[160px] dark:bg-brand-500/[0.06]" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-teal-400/[0.03] blur-[130px] dark:bg-teal-400/[0.05]" />
      </div>

      <Container className="relative">

        {/* ══ HEADER (centered) ══ */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-cyan-400" />
              {outcomes.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-h2 md:text-h2-lg font-semibold tracking-[-0.04em] text-balance text-ink dark:text-frost">
              {outcomes.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-body-lg text-pretty text-ink-muted dark:text-frost-muted">
              {outcomes.sub}
            </p>
          </Reveal>
        </div>

        {/* ══ IMPACT NUMBERS ══
            4 big gradient stats — no card boxes, separated by hairline dividers
        ══ */}
        <Reveal delay={0.13}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/[0.07]">
            {/* Top gradient rule */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(79,107,255,0.45),rgba(40,215,181,0.35),transparent)",
              }}
            />
            <div className="grid grid-cols-2 divide-x divide-y divide-slate-200/80 lg:grid-cols-4 lg:divide-y-0 dark:divide-white/[0.07]">
              {STATS.map((s) => (
                <div key={s.label} className="group relative flex flex-col items-center gap-2 px-6 py-8 text-center">
                  {/* Hover glow */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${s.color}08, transparent 70%)` }}
                  />
                  {/* Big number */}
                  <div
                    className="relative font-mono text-[3rem] font-bold leading-none tracking-[-0.06em] md:text-[3.5rem]"
                    style={{
                      background: `linear-gradient(135deg,${s.color},${s.color}cc)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.val}
                    {s.sub && (
                      <span className="ml-1 text-[1.1rem] font-semibold">{s.sub}</span>
                    )}
                  </div>
                  {/* Label */}
                  <p className="text-[0.78rem] leading-snug text-ink-muted dark:text-frost-subtle">
                    {s.label}
                  </p>
                  {/* Bottom accent on hover */}
                  <div
                    aria-hidden
                    className="absolute inset-x-8 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `linear-gradient(to right,transparent,${s.color}60,transparent)` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ══ OUTCOMES GRID ══
            2×2 editorial grid — no cards, just left accent bars +
            internal dividers; watermark step numbers in background.
        ══ */}
        <Reveal delay={0.17}>
          <div className="relative mt-4 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/[0.07]">
            {/* Bottom gradient rule */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(124,92,255,0.30),rgba(73,198,255,0.25),transparent)",
              }}
            />

            <div className="grid lg:grid-cols-2">
              {outcomes.items.map((item, i) => {
                const acc = ACCENTS[i];
                const isLeftCol  = i % 2 === 0;
                const isTopRow   = i < 2;

                return (
                  <div
                    key={item.title}
                    className={[
                      "group relative overflow-hidden px-8 py-9 transition-colors duration-200",
                      "hover:bg-slate-50/60 dark:hover:bg-white/[0.02]",
                      isLeftCol  ? "lg:border-r border-slate-200/80 dark:border-white/[0.07]" : "",
                      isTopRow   ? "border-b border-slate-200/80 dark:border-white/[0.07]"   : "",
                    ].filter(Boolean).join(" ")}
                  >
                    {/* Watermark step number */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute right-6 top-4 select-none font-mono text-[5rem] font-black leading-none tracking-[-0.08em] opacity-[0.035] dark:opacity-[0.06]"
                      style={{ color: acc.from }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Hover glow orb */}
                    <div
                      aria-hidden
                      className="absolute -left-8 -top-8 h-32 w-32 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: acc.glow }}
                    />

                    {/* Left gradient accent bar */}
                    <div
                      aria-hidden
                      className="absolute left-0 top-8 bottom-8 w-[3px] rounded-r-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(to bottom,${acc.from},${acc.to})`,
                      }}
                    />

                    <div className="relative pl-4">
                      {/* Audience tag + icon */}
                      <div className="flex items-center justify-between gap-4">
                        <span
                          className="text-[0.62rem] font-bold uppercase tracking-[0.20em]"
                          style={{ color: acc.from }}
                        >
                          {item.audience}
                        </span>
                        <div
                          className="flex h-9 w-9 flex-none items-center justify-center rounded-xl text-white"
                          style={{
                            background: `linear-gradient(135deg,${acc.from},${acc.to})`,
                            boxShadow: `0 4px 14px ${acc.glow}`,
                          }}
                        >
                          <Icon name={item.icon} className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="mt-4 text-[1.25rem] font-semibold leading-snug tracking-[-0.03em] text-ink dark:text-frost">
                        {item.title}
                      </h3>

                      {/* Body */}
                      <p className="mt-3 text-[0.86rem] leading-relaxed text-ink-muted dark:text-frost-muted">
                        {item.body}
                      </p>

                      {/* Metric + proof inline chips */}
                      {(item.metric || item.proof) && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {item.metric && (
                            <span
                              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.7rem] font-medium"
                              style={{
                                background: `${acc.from}10`,
                                border: `1px solid ${acc.from}25`,
                                color: acc.from,
                              }}
                            >
                              <span className="h-1 w-1 rounded-full" style={{ background: acc.from }} />
                              {item.metric}
                            </span>
                          )}
                          {item.proof && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 px-3 py-1 text-[0.7rem] font-medium text-ink-muted dark:border-white/[0.08] dark:text-frost-subtle">
                              <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-white/20" />
                              {item.proof}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
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
