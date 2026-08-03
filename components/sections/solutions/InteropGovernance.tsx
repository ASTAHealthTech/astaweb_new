import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DrawLines } from "@/components/ui/DrawLines";
import { interopGovernance } from "@/content/solutions";

export function InteropGovernance() {
  const { items } = interopGovernance;

  const getItemId = (index: number) => {
    switch (index) {
      case 0:
        return "hl7-fhir";
      case 1:
        return "dpdp-governance";
      case 2:
        return "rbac";
      case 3:
        return "audit-trail";
      case 4:
        return "data-residency";
      case 5:
        return "privacy-security";
      default:
        return `gov-${index}`;
    }
  };

  return (
    <section id="governance" className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="text-center">
            <h2 className="mx-auto max-w-[640px] text-[1.8rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost md:text-[2.375rem]">
              Hospital-ready governance <span className="text-accent">without slowing deployment</span>.
            </h2>
            <p className="mx-auto mt-3 max-w-[500px] text-[0.9375rem] leading-relaxed text-fg-muted dark:text-frost-muted">
              Built to integrate into existing hospital IT, security, and governance frameworks with auditable operations.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 grid overflow-hidden rounded-xl border border-border dark:border-night-edge sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <div
                key={item.title}
                id={getItemId(index)}
                className="relative flex flex-col justify-between bg-bg p-6 md:p-8 dark:bg-night scroll-mt-24"
              >
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
