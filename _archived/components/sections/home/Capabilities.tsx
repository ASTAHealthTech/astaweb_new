import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { capabilities } from "@/content/home";

export function Capabilities() {
  const { heading, sub, items } = capabilities;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="text-center">
            <h2 className="mx-auto max-w-[640px] text-[1.8rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost md:text-[2.375rem]">
              {heading}
            </h2>
            {sub && (
              <p className="mx-auto mt-3 max-w-[480px] text-[0.9375rem] leading-relaxed text-fg-muted dark:text-frost-muted">
                {sub}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border dark:border-night-edge dark:bg-night-edge sm:grid-cols-2 lg:grid-cols-3">
            {items.map((cap, index) => (
              <div key={cap.title} className="relative flex h-full flex-col justify-between bg-bg p-6 dark:bg-night md:p-8">
                {/* Typographic Anchoring Number */}
                <span className="pointer-events-none absolute right-4 top-2 font-mono text-[3rem] font-bold text-neutral-200/50 dark:text-white/[0.04]">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-[1.05rem] font-semibold text-fg dark:text-frost">
                    {cap.title}
                  </h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-fg-muted dark:text-frost-muted">
                    {cap.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
