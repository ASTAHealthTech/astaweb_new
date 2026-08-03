import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DrawLines } from "@/components/ui/DrawLines";
import { platformSignalFlow } from "@/content/platform";

export function PlatformSignalFlow() {
  const { steps } = platformSignalFlow;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="text-center">
            <h2 className="mx-auto max-w-[640px] text-[1.8rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost md:text-[2.375rem]">
              End-to-end signal flow from <span className="text-accent">screen to alert</span>.
            </h2>
            <p className="mx-auto mt-3 max-w-[480px] text-[0.9375rem] leading-relaxed text-fg-muted dark:text-frost-muted">
              How vital numerics move from bedside monitor displays to structured clinical action in real time.
            </p>
          </div>
        </Reveal>

        {/* 5-Step Continuous Signal Flow Pipeline (5 Columns on Large Displays, ZERO Empty Slots) */}
        {/* 5-Step Continuous Signal Flow Pipeline (5 Columns on Large Displays, ZERO Empty Slots) */}
        <Reveal delay={0.08}>
          <div className="mt-12 grid overflow-hidden rounded-2xl border border-border dark:border-night-edge sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
              <div key={step.step} className="relative flex flex-col justify-between bg-bg p-6 dark:bg-night">
                {/* Typographic Anchoring Number */}
                <span className="pointer-events-none absolute right-4 top-2 font-mono text-[2.75rem] font-bold text-neutral-200/50 dark:text-white/[0.04]">
                  {parseInt(step.step, 10)}
                </span>

                <div>
                  <h3 className="text-[1.02rem] font-semibold text-fg dark:text-frost">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-fg-muted dark:text-frost-muted">
                    {step.body}
                  </p>
                </div>

                {i < steps.length - 1 && <DrawLines className="right-0 hidden lg:block" delay={i * 100} />}
                {i % 2 !== 1 && <DrawLines className="right-0 hidden sm:block lg:hidden" delay={i * 100} />}
                {i < steps.length - 2 && <DrawLines horizontal className="bottom-0 hidden sm:block lg:hidden" delay={i * 100} />}
                {i < steps.length - 1 && <DrawLines horizontal className="bottom-0 sm:hidden" delay={i * 100} />}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
