import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { aboutInstitutionalPedigree } from "@/content/about";

export function AboutInstitutionalPedigree() {
  const { partners, footer } = aboutInstitutionalPedigree;

  return (
    <section id="institutional-pedigree" className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="text-center">
            <h2 className="mx-auto max-w-[640px] text-[1.8rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost md:text-[2.375rem]">
              Grounded in serious institutions, <span className="text-accent">not built in isolation</span>.
            </h2>
            <p className="mx-auto mt-3 max-w-[480px] text-[0.9375rem] leading-relaxed text-fg-muted dark:text-frost-muted">
              ASTA&apos;s journey is backed by top incubation programs, research initiatives, and clinical engineering talent.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border dark:border-night-edge dark:bg-night-edge sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner) => (
              <div key={partner.name} className="flex flex-col justify-between bg-bg p-6 dark:bg-night">
                <div>
                  <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-border bg-white dark:border-night-edge dark:bg-night-panel">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={80}
                      height={80}
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <h3 className="text-center text-[0.95rem] font-semibold text-fg dark:text-frost">
                    {partner.name}
                  </h3>
                  <p className="mt-0.5 text-center text-[0.75rem] text-fg-subtle dark:text-frost-muted">
                    {partner.descriptor}
                  </p>
                  <div className="mt-2.5 flex justify-center">
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[0.68rem] font-semibold text-accent">
                      {partner.badge}
                    </span>
                  </div>
                  <p className="mt-3 text-[0.8rem] leading-relaxed text-fg-muted dark:text-frost-muted">
                    {partner.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mx-auto mt-8 max-w-[640px] text-center text-[0.8125rem] text-fg-subtle dark:text-frost-muted">
            {footer}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
