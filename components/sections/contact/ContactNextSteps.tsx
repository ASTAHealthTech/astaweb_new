import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactNextSteps } from "@/content/contact";

export function ContactNextSteps() {
  return (
    <section className="relative overflow-hidden bg-canvas py-20 md:py-24 dark:bg-[#060816]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,22,40,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(10,22,40,0.03) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="absolute inset-0 hidden bg-grid-fine bg-[length:44px_44px] opacity-60 dark:block" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-400/25" />
      </div>

      <Container className="relative">
        <SectionHeading
          eyebrow={contactNextSteps.eyebrow}
          title={contactNextSteps.heading}
          sub={contactNextSteps.sub}
          align="center"
          maxWidth="max-w-3xl"
        />

        <div className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-2 xl:grid-cols-4">
          {contactNextSteps.steps.map((item, index) => (
            <Reveal key={item.step} delay={0.12 + index * 0.04}>
              <article className="relative h-full overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#040810] p-5 text-white">
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px"
                  style={{
                    background:
                      index === 0
                        ? "linear-gradient(to right,transparent,rgba(79,107,255,0.72),rgba(124,92,255,0.38),transparent)"
                        : index === 1
                          ? "linear-gradient(to right,transparent,rgba(40,215,181,0.72),rgba(73,198,255,0.34),transparent)"
                          : index === 2
                            ? "linear-gradient(to right,transparent,rgba(73,198,255,0.72),rgba(79,107,255,0.36),transparent)"
                            : "linear-gradient(to right,transparent,rgba(124,92,255,0.72),rgba(40,215,181,0.34),transparent)",
                  }}
                />
                <div className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white/32">
                  {item.step}
                </div>
                <h3 className="mt-4 text-[1rem] font-semibold tracking-[-0.03em] text-frost">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.82rem] leading-relaxed text-white/58">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
