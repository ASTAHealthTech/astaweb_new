import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { platformStack } from "@/content/platform";

export function PlatformIntelligenceStack() {
  const { layers, footer } = platformStack;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Sticky Left Heading */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <Reveal>
              <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.03em] text-fg dark:text-frost sm:text-[2.5rem]">
                A 3-layer clinical intelligence stack <span className="text-accent">for hospital deployment</span>.
              </h1>
              <p className="mt-4 text-[0.9375rem] leading-[1.65] text-fg-muted dark:text-frost-muted">
                From computer vision monitor reading to physiological reasoning and role-aware escalation.
              </p>
              <p className="mt-6 text-[0.8125rem] leading-relaxed text-fg-subtle dark:text-frost-muted">
                {footer}
              </p>
            </Reveal>
          </div>

          {/* Right Column Bento Cards */}
          <div className="space-y-4">
            {layers.map((layer, index) => (
              <Reveal key={layer.title} delay={0.08 * index}>
                <div className="relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm dark:border-night-edge dark:bg-night-panel md:p-8">
                  {/* Typographic Anchoring Number */}
                  <span className="pointer-events-none absolute right-4 top-2 font-mono text-[3.5rem] font-bold text-neutral-200/50 dark:text-white/[0.04]">
                    0{index + 1}
                  </span>

                  <div className="relative">
                    <h3 className="text-[1.15rem] font-semibold text-fg dark:text-frost">
                      {layer.title}
                    </h3>
                    <p className="mt-2 text-[0.84rem] leading-relaxed text-fg-muted dark:text-frost-muted">
                      {layer.body}
                    </p>

                    <div className="mt-5 border-t border-border/60 pt-4 dark:border-night-edge/60">
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {layer.bullets.map((b) => (
                          <li key={b} className="flex items-center gap-2 text-[0.78rem] text-fg-subtle dark:text-frost-muted">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
