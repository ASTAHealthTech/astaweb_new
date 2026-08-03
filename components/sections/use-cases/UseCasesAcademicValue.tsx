import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DrawLines } from "@/components/ui/DrawLines";
import { teachingHospitalValue } from "@/content/use-cases";

export function UseCasesAcademicValue() {
  const { heading, sub, pillars, pathway } = teachingHospitalValue;

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

        {/* 4 Pillars Bento Grid */}
        <Reveal delay={0.08}>
          <div className="mt-12 grid overflow-hidden rounded-xl border border-border dark:border-night-edge sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, index) => (
              <div key={p.title} className="relative flex flex-col justify-between bg-bg p-6 dark:bg-night">
                {/* Typographic Anchoring Number */}
                <span className="pointer-events-none absolute right-4 top-2 font-mono text-[3rem] font-bold text-neutral-200/50 dark:text-white/[0.04]">
                  0{index + 1}
                </span>

                <div>
                  <h3 className="text-[1.05rem] font-semibold text-fg dark:text-frost">{p.title}</h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-fg-muted dark:text-frost-muted">{p.body}</p>
                </div>
                
                {index < pillars.length - 1 && <DrawLines className="right-0 hidden lg:block" delay={index * 100} />}
                {index % 2 !== 1 && <DrawLines className="right-0 hidden sm:block lg:hidden" delay={index * 100} />}
                {index < pillars.length - 2 && <DrawLines horizontal className="bottom-0 hidden sm:block lg:hidden" delay={index * 100} />}
                {index < pillars.length - 1 && <DrawLines horizontal className="bottom-0 sm:hidden" delay={index * 100} />}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Signal Flow Pathway Line (4 steps in a continuous bento bar) */}
        <Reveal delay={0.14}>
          <div className="mt-8">
            <div className="text-center mb-4">
              <span className="text-[0.8rem] font-semibold text-accent tracking-wide uppercase">Implementation Pathway</span>
            </div>
            <div className="grid overflow-hidden rounded-xl border border-border dark:border-night-edge sm:grid-cols-2 lg:grid-cols-4">
              {pathway.map((step, index) => (
                <div key={step.title} className="relative bg-bg p-5 text-center dark:bg-night">
                  <h4 className="text-[0.9rem] font-semibold text-fg dark:text-frost">{step.title}</h4>
                  <p className="mt-1.5 text-[0.78rem] leading-relaxed text-fg-muted dark:text-frost-muted">{step.body}</p>
                  
                  {index < pathway.length - 1 && <DrawLines className="right-0 hidden lg:block" delay={index * 100} />}
                  {index % 2 !== 1 && <DrawLines className="right-0 hidden sm:block lg:hidden" delay={index * 100} />}
                  {index < pathway.length - 2 && <DrawLines horizontal className="bottom-0 hidden sm:block lg:hidden" delay={index * 100} />}
                  {index < pathway.length - 1 && <DrawLines horizontal className="bottom-0 sm:hidden" delay={index * 100} />}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
