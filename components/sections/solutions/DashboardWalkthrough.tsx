import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { dashboardWalkthrough } from "@/content/solutions";

const STATUS_COLOR = {
  ok:    { dot: "#28D7B5", label: "OK",    bg: "bg-emerald-500/10 text-emerald-400" },
  warn:  { dot: "#FBBF24", label: "WATCH", bg: "bg-amber-500/10 text-amber-400"    },
  alert: { dot: "#EF4444", label: "ALERT", bg: "bg-red-500/10 text-red-400"        },
} as const;

export function DashboardWalkthrough() {
  const { wardStats, bedRows, alertQueue } = dashboardWalkthrough;

  return (
    <section
      id="dashboard"
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
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.03] blur-[150px] dark:bg-cyan-400/[0.05]" />
      </div>

      <Container className="relative">

        {/* ══ HEADER ══ */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-cyan-400" />
              {dashboardWalkthrough.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-h2 font-semibold tracking-[-0.04em] text-ink dark:text-frost md:text-h2-lg">
              {dashboardWalkthrough.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-body-lg text-ink-muted dark:text-frost-muted">
              {dashboardWalkthrough.sub}
            </p>
          </Reveal>
        </div>

        {/* ══ DASHBOARD PANEL ══ */}
        <Reveal delay={0.15}>
          <div className="relative mt-16 overflow-hidden rounded-2xl border border-brand-400/[0.10] bg-[#040810] text-white shadow-[0_28px_90px_rgba(3,7,18,0.42)]">

            {/* Glow blobs */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-16 top-0 h-64 w-64 rounded-full bg-brand-500/[0.10] blur-[90px]" />
              <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-teal-400/[0.07] blur-[80px]" />
              <div className="absolute right-1/3 top-1/3 h-44 w-44 rounded-full bg-violet-500/[0.05] blur-[70px]" />
            </div>

            {/* Top shine */}
            <div
              aria-hidden
              className="absolute inset-x-[5%] top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(79,107,255,0.45),rgba(73,198,255,0.24),transparent)",
              }}
            />

            {/* macOS title bar */}
            <div className="relative flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                <span className="mx-3 h-4 w-px bg-white/[0.10]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
                  ASTA · Ward Command View · Ward 3 · Nursing / Clinical / Ops
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.10] px-2.5 py-1 font-mono text-[9px] font-bold text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                LIVE
              </div>
            </div>

            {/* Ward stats strip */}
            <div className="grid grid-cols-2 divide-x divide-white/[0.05] border-b border-white/[0.05] sm:grid-cols-4">
              {wardStats.map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-1.5 px-6 py-5 text-center">
                  <span
                    className="font-mono text-[1.5rem] font-bold leading-none"
                    style={{
                      background: `linear-gradient(135deg,${s.color},${s.color}bb)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.value}
                  </span>
                  <span className="text-[0.7rem] text-white/35">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Two-column: beds left, alerts right */}
            <div className="grid lg:grid-cols-[1.9fr_3.1fr]">

              {/* Left: Bed list */}
              <div className="relative border-b border-white/[0.05] lg:border-b-0 lg:border-r">
                <div className="border-b border-white/[0.04] px-6 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.20em] text-white/30">
                      Live bed view · 6 of 24 shown
                    </span>
                  </div>
                </div>

                {/* Table header */}
                <div className="grid grid-cols-[56px_1fr_1fr_1fr_58px] gap-1 border-b border-white/[0.04] px-6 py-2.5">
                  {["Bed", "HR", "SpO₂", "BP", "Status"].map((h) => (
                    <span key={h} className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/22">
                      {h}
                    </span>
                  ))}
                </div>

                {/* Bed rows */}
                <div className="font-mono">
                  {bedRows.map((row) => {
                    const s = STATUS_COLOR[row.status];
                    return (
                      <div
                        key={row.bed}
                        className="grid grid-cols-[56px_1fr_1fr_1fr_58px] items-center gap-1 border-b border-white/[0.03] px-6 py-3 transition-colors hover:bg-white/[0.025]"
                      >
                        <span className="text-[10px] font-bold text-white/65">{row.bed}</span>
                        <span className="text-[10px] text-white/50">{row.hr}</span>
                        <span className="text-[10px] text-white/50">{row.spo2}</span>
                        <span className="text-[10px] text-white/50">{row.bp}</span>
                        <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[8px] font-bold ${s.bg}`}>
                          <span className="h-1 w-1 rounded-full" style={{ background: s.dot }} />
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="px-6 py-3 font-mono text-[8px] text-white/20">
                  18 additional beds · scroll to view all
                </div>
              </div>

              {/* Right: Alert queue */}
              <div className="flex flex-col">
                <div className="border-b border-white/[0.04] px-6 py-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.20em] text-white/30">
                        Escalation Queue
                      </span>
                    </div>
                    <span className="rounded-full border border-amber-500/25 bg-amber-500/[0.10] px-2.5 py-0.5 font-mono text-[8px] font-bold text-amber-400">
                      {alertQueue.length} active
                    </span>
                  </div>
                </div>

                {/* Alert rows */}
                <div className="flex-1 font-mono">
                  {alertQueue.map((alert) => (
                    <div
                      key={alert.time + alert.bed}
                      className="flex items-start gap-3 border-b border-white/[0.03] px-6 py-4 transition-colors hover:bg-white/[0.02]"
                    >
                      {/* Priority badge */}
                      <span
                        className={`mt-0.5 flex-none rounded px-1.5 py-0.5 text-[8px] font-bold uppercase ${
                          alert.priority === "high"
                            ? "bg-red-500/15 text-red-400"
                            : "bg-amber-500/12 text-amber-400"
                        }`}
                      >
                        {alert.priority === "high" ? "HIGH" : "MED"}
                      </span>
                      {/* Bed badge */}
                      <span className="mt-0.5 flex-none rounded bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-bold text-white/55">
                        {alert.bed}
                      </span>
                      {/* Message */}
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] leading-5 text-white/50">{alert.msg}</span>
                        <div className="mt-0.5 font-mono text-[8px] text-white/22">{alert.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-white/[0.04] px-6 py-3 font-mono text-[8px] text-white/20">
                  tamper-evident audit trail · hospital-controlled retention · role-based access enforced
                </div>
              </div>

            </div>
          </div>
        </Reveal>

      </Container>
    </section>
  );
}
