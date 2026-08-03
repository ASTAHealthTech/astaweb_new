import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DrawLines } from "@/components/ui/DrawLines";
import { platformValidation } from "@/content/platform";

export function PlatformValidation() {
  const { metrics, rows, footer } = platformValidation;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="text-center">
            <h2 className="mx-auto max-w-[640px] text-[1.8rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost md:text-[2.375rem]">
              Clinical validation and <span className="text-accent">accuracy metrics</span>.
            </h2>
            <p className="mx-auto mt-3 max-w-[480px] text-[0.9375rem] leading-relaxed text-fg-muted dark:text-frost-muted">
              Rigorously benchmarked in real hospital environments across edge scenarios, lighting variations, and monitor display types.
            </p>
          </div>
        </Reveal>

        {/* 6 Metrics Strip */}
        <Reveal delay={0.08}>
          <div className="mt-12 grid overflow-hidden rounded-xl border border-border dark:border-night-edge grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {metrics.map((m, i) => (
              <div key={m.label} className="relative bg-bg p-5 text-center dark:bg-night">
                <div className="font-mono text-[1.75rem] font-bold tracking-[-0.04em] text-accent">
                  {m.value}
                </div>
                <div className="mt-1 text-[0.78rem] font-semibold text-fg dark:text-frost">{m.label}</div>
                <div className="mt-0.5 text-[0.7rem] text-fg-subtle dark:text-frost-muted">{m.note}</div>
                
                {i < metrics.length - 1 && <DrawLines className="right-0 hidden lg:block" delay={i * 100} />}
                {i % 3 !== 2 && <DrawLines className="right-0 hidden sm:block lg:hidden" delay={i * 100} />}
                {i % 2 !== 1 && <DrawLines className="right-0 sm:hidden" delay={i * 100} />}
                {i < metrics.length - 3 && <DrawLines horizontal className="bottom-0 hidden sm:block lg:hidden" delay={i * 100} />}
                {i < metrics.length - 2 && <DrawLines horizontal className="bottom-0 sm:hidden" delay={i * 100} />}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Validation Table */}
        <Reveal delay={0.12}>
          <div className="mx-auto mt-8 max-w-[800px] overflow-hidden rounded-xl border border-border bg-white shadow-sm dark:border-night-edge dark:bg-night-panel">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-bg text-[0.72rem] font-semibold uppercase tracking-wider text-fg-subtle dark:border-night-edge dark:bg-night dark:text-frost-muted">
                  <th className="px-4 py-3 text-left">Dimension</th>
                  <th className="px-4 py-3 text-left">Proof</th>
                  <th className="hidden px-4 py-3 text-left md:table-cell">Implication</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-night-edge">
                {rows.map((r) => (
                  <tr key={r.dimension}>
                    <td className="px-4 py-3 text-[0.825rem] font-semibold text-fg dark:text-frost">{r.dimension}</td>
                    <td className="px-4 py-3 text-[0.825rem] text-accent font-mono font-medium">{r.proof}</td>
                    <td className="hidden px-4 py-3 text-[0.8rem] text-fg-muted dark:text-frost-muted md:table-cell">{r.implication}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-8 max-w-[560px] text-center text-[0.8125rem] text-fg-subtle dark:text-frost-muted">{footer}</p>
        </Reveal>
      </Container>
    </section>
  );
}
