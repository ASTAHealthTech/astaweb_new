import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DrawLines } from "@/components/ui/DrawLines";
import { platformReasoningLayer } from "@/content/platform";

export function PlatformReasoningLayer() {
  const { pillars, comparisons, footer } = platformReasoningLayer;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="text-center">
            <h2 className="mx-auto max-w-[640px] text-[1.8rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost md:text-[2.375rem]">
              Physiological reasoning beyond <span className="text-accent">threshold alerts</span>.
            </h2>
            <p className="mx-auto mt-3 max-w-[480px] text-[0.9375rem] leading-relaxed text-fg-muted dark:text-frost-muted">
              Evaluates vital sign trajectories over time to distinguish clinically meaningful deterioration from temporary spikes.
            </p>
          </div>
        </Reveal>

        {/* Pillars Grid */}
        <Reveal delay={0.08}>
          <div className="mt-12 grid overflow-hidden rounded-xl border border-border dark:border-night-edge sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <div key={p.title} className="relative flex flex-col justify-between bg-bg p-6 dark:bg-night">
                <div>
                  <h3 className="text-[0.95rem] font-semibold text-fg dark:text-frost">{p.title}</h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-fg-muted dark:text-frost-muted">{p.body}</p>
                </div>
                {i < pillars.length - 1 && <DrawLines className="right-0 hidden lg:block" delay={i * 100} />}
                {i % 2 !== 1 && <DrawLines className="right-0 hidden sm:block lg:hidden" delay={i * 100} />}
                {i < pillars.length - 2 && <DrawLines horizontal className="bottom-0 hidden sm:block lg:hidden" delay={i * 100} />}
                {i < pillars.length - 1 && <DrawLines horizontal className="bottom-0 sm:hidden" delay={i * 100} />}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Comparisons */}
        <Reveal delay={0.12}>
          <div className="mx-auto mt-8 max-w-[680px] space-y-2.5">
            {comparisons.map((c) => (
              <div
                key={c.label}
                className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 dark:border-night-edge dark:bg-night-panel"
              >
                <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-accent" />
                <div>
                  <span className="text-[0.82rem] font-semibold text-accent">
                    {c.label}
                  </span>
                  <p className="mt-0.5 text-[0.8125rem] text-fg-muted dark:text-frost-muted">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-8 max-w-[560px] text-center text-[0.8125rem] text-fg-subtle dark:text-frost-muted">{footer}</p>
        </Reveal>
      </Container>
    </section>
  );
}
