import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DrawLines } from "@/components/ui/DrawLines";
import { useCasesOutcomes } from "@/content/use-cases";

export function UseCasesOutcomes() {
  const { heading, sub, items } = useCasesOutcomes;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="text-center">
            <h2 className="mx-auto max-w-[640px] text-[1.8rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost md:text-[2.375rem]">
              {heading}
            </h2>
            <p className="mx-auto mt-3 max-w-[500px] text-[0.9375rem] leading-relaxed text-fg-muted dark:text-frost-muted">
              {sub}
            </p>
          </div>
        </Reveal>

        {/* 6-cell Bento Box Grid (2x3 or 3x2, zero empty slots) */}
        <Reveal delay={0.08}>
          <div className="mt-12 grid overflow-hidden rounded-xl border border-border dark:border-night-edge sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <div key={item.title} className="relative flex flex-col justify-between bg-bg p-6 dark:bg-night md:p-8">
                {/* Typographic Anchoring Number */}
                <span className="pointer-events-none absolute right-4 top-2 font-mono text-[3rem] font-bold text-neutral-200/50 dark:text-white/[0.04]">
                  0{index + 1}
                </span>

                <div>
                  <h3 className="text-[1.05rem] font-semibold text-fg dark:text-frost">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-fg-muted dark:text-frost-muted">
                    {item.body}
                  </p>
                </div>
                
                {index < items.length - 1 && <DrawLines className="right-0 hidden lg:block" delay={index * 100} />}
                {index % 3 !== 2 && <DrawLines className="right-0 hidden sm:block lg:hidden" delay={index * 100} />}
                {index % 2 !== 1 && <DrawLines className="right-0 sm:hidden" delay={index * 100} />}
                
                {index < items.length - 3 && <DrawLines horizontal className="bottom-0 hidden lg:block" delay={index * 100} />}
                {index < items.length - 2 && <DrawLines horizontal className="bottom-0 hidden sm:block lg:hidden" delay={index * 100} />}
                {index < items.length - 1 && <DrawLines horizontal className="bottom-0 sm:hidden" delay={index * 100} />}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
