import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DrawLines } from "@/components/ui/DrawLines";
import { ScrollScale } from "@/components/ui/ScrollScale";
import { dashboardWalkthrough } from "@/content/solutions";

export function DashboardWalkthrough() {
  const { wardStats, bedRows, alertQueue } = dashboardWalkthrough;

  return (
    <section className="relative py-16 md:py-24 bg-bg">
      <Container>
        <Reveal>
          <div className="text-center">
            <h2 className="mx-auto max-w-[640px] text-[1.8rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost md:text-[2.375rem]">
              The live ward view for nursing, clinical leadership, <span className="text-accent">and operations</span>.
            </h2>
            <p className="mx-auto mt-3 max-w-[540px] text-[0.9375rem] leading-relaxed text-fg-muted dark:text-frost-muted">
              One shared product surface for the whole unit: monitored beds, structured vitals, escalation queue, and audit trail in a single ward view.
            </p>
          </div>
        </Reveal>

        {/* Dashboard Light Mockup Bento Box */}
        <Reveal delay={0.12} y={20}>
          <ScrollScale>
            <div className="mx-auto mt-12 max-w-[940px] overflow-hidden rounded-2xl border border-border bg-white shadow-sm dark:border-night-edge dark:bg-night-panel">
            {/* Chrome Header Bar with Theme Fonts and NO Pill Badge */}
            <div className="flex items-center justify-between border-b border-border bg-bg/80 px-4 py-3 dark:border-night-edge dark:bg-night/80">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                <span className="ml-2 text-[0.8125rem] font-medium text-fg-subtle dark:text-frost-muted">
                  ASTA Ward Control Surface v2.4: Live Unit Oversight
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {/* Asymmetrical Ward Stats */}
              <div className="grid overflow-hidden rounded-xl border border-border dark:border-night-edge sm:grid-cols-4">
                {wardStats.map((s, i) => (
                  <div key={s.label} className="relative bg-bg p-4 dark:bg-night">
                    <div className="text-[0.7rem] font-medium text-fg-subtle dark:text-frost-muted">{s.label}</div>
                    <div className="mt-1 font-mono text-[1.4rem] font-bold text-fg dark:text-frost">
                      {s.value}
                    </div>
                    {i < wardStats.length - 1 && <DrawLines className="right-0 hidden sm:block" delay={i * 100} />}
                    {i < wardStats.length - 1 && <DrawLines horizontal className="bottom-0 sm:hidden" delay={i * 100} />}
                  </div>
                ))}
              </div>

              {/* Bed Status Table */}
              <div className="mt-6 overflow-hidden rounded-xl border border-border bg-white dark:border-night-edge dark:bg-night-panel">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border bg-bg/60 text-[0.7rem] font-semibold uppercase tracking-wider text-fg-subtle dark:border-night-edge dark:bg-night/60 dark:text-frost-muted">
                      <th className="px-4 py-2.5">Bed</th>
                      <th className="px-4 py-2.5">HR (bpm)</th>
                      <th className="px-4 py-2.5">SpO₂ (%)</th>
                      <th className="px-4 py-2.5">BP (mmHg)</th>
                      <th className="px-4 py-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border dark:divide-night-edge">
                    {bedRows.map((r) => (
                      <tr key={r.bed} className="hover:bg-bg/40 dark:hover:bg-night/40">
                        <td className="px-4 py-3 font-mono text-[0.8rem] font-bold text-fg dark:text-frost">{r.bed}</td>
                        <td className="px-4 py-3 font-mono text-[0.8rem] text-fg-muted dark:text-frost-muted">{r.hr}</td>
                        <td className="px-4 py-3 font-mono text-[0.8rem] text-fg-muted dark:text-frost-muted">{r.spo2}</td>
                        <td className="px-4 py-3 font-mono text-[0.8rem] text-fg-muted dark:text-frost-muted">{r.bp}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase ${
                              r.status === "alert"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                : r.status === "warn"
                                ? "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                                : "bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-300"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                r.status === "alert"
                                  ? "bg-amber-600 dark:bg-amber-400"
                                  : r.status === "warn"
                                  ? "bg-neutral-500"
                                  : "bg-brand-600 dark:bg-brand-400"
                              }`}
                            />
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Escalation Queue */}
              <div className="mt-6 space-y-2.5">
                {alertQueue.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-border bg-bg/50 p-3.5 dark:border-night-edge dark:bg-night/50"
                  >
                    <span className="mt-1 h-2 w-2 flex-none rounded-full bg-accent" />
                    <div>
                      <span className="font-mono text-[0.7rem] font-medium text-fg-subtle dark:text-frost-muted">
                        {a.time} · {a.bed}
                      </span>
                      <p className="mt-0.5 text-[0.8125rem] text-fg-muted dark:text-frost-muted">{a.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollScale>
      </Reveal>
      </Container>
    </section>
  );
}
