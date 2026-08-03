import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DrawLines } from "@/components/ui/DrawLines";
import { platformVisionLayer } from "@/content/platform";

export function PlatformComputerVision() {
  const { points, metrics, pipeline, footer } = platformVisionLayer;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="text-center">
            <h2 className="mx-auto max-w-[640px] text-[1.8rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost md:text-[2.375rem]">
              Monitor-agnostic computer vision <span className="text-accent">vital extraction</span>.
            </h2>
            <p className="mx-auto mt-3 max-w-[480px] text-[0.9375rem] leading-relaxed text-fg-muted dark:text-frost-muted">
              Reads vital sign numerics directly from bedside displays across 15+ OEM monitor brands without digital interfaces.
            </p>
          </div>
        </Reveal>

        {/* 4 Metrics Strip */}
        <Reveal delay={0.08}>
          <div className="mt-12 grid overflow-hidden rounded-xl border border-border dark:border-night-edge sm:grid-cols-4">
            {metrics.map((m, i) => (
              <div key={m.label} className="relative bg-bg p-6 text-center dark:bg-night">
                <div className="font-mono text-[2.25rem] font-bold tracking-[-0.04em] text-accent">
                  {m.value}
                </div>
                <div className="mt-1 text-[0.8rem] font-semibold text-fg dark:text-frost">{m.label}</div>
                <div className="mt-0.5 text-[0.72rem] text-fg-subtle dark:text-frost-muted">{m.note}</div>
                
                {i < metrics.length - 1 && <DrawLines className="right-0 hidden sm:block" delay={i * 100} />}
                {i < metrics.length - 1 && <DrawLines horizontal className="bottom-0 sm:hidden" delay={i * 100} />}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Feature Points Grid */}
        <Reveal delay={0.12}>
          <div className="mt-6 grid overflow-hidden rounded-xl border border-border dark:border-night-edge sm:grid-cols-2">
            {points.map((p, i) => (
              <div key={p.title} className="relative flex flex-col justify-between bg-bg p-6 dark:bg-night">
                <div>
                  <h3 className="text-[1rem] font-semibold text-fg dark:text-frost">{p.title}</h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-fg-muted dark:text-frost-muted">{p.body}</p>
                </div>
                {i < points.length - 1 && <DrawLines className="right-0 hidden sm:block" delay={i * 100} />}
                {i < points.length - 1 && <DrawLines horizontal className="bottom-0 sm:hidden" delay={i * 100} />}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Pipeline Steps (4 items in 4 columns = ZERO empty slots) */}
        <Reveal delay={0.16}>
          <div className="mt-6 grid overflow-hidden rounded-xl border border-border dark:border-night-edge sm:grid-cols-2 lg:grid-cols-4">
            {pipeline.map((step, i) => (
              <div key={step.title} className="relative flex flex-col justify-between bg-bg p-6 dark:bg-night">
                <span className="pointer-events-none absolute right-4 top-2 font-mono text-[2.75rem] font-bold text-neutral-200/50 dark:text-white/[0.04]">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-[0.95rem] font-semibold text-fg dark:text-frost">{step.title}</h3>
                  <p className="mt-1.5 text-[0.8rem] leading-relaxed text-fg-muted dark:text-frost-muted">{step.body}</p>
                </div>
                {i < pipeline.length - 1 && <DrawLines className="right-0 hidden lg:block" delay={i * 100} />}
                {i % 2 !== 1 && <DrawLines className="right-0 hidden sm:block lg:hidden" delay={i * 100} />}
                {i < pipeline.length - 2 && <DrawLines horizontal className="bottom-0 hidden sm:block lg:hidden" delay={i * 100} />}
                {i < pipeline.length - 1 && <DrawLines horizontal className="bottom-0 sm:hidden" delay={i * 100} />}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-[560px] text-center text-[0.8125rem] text-fg-subtle dark:text-frost-muted">{footer}</p>
        </Reveal>
      </Container>
    </section>
  );
}
