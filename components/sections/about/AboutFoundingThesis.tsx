import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardBody, CardMeta, CardTitle } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { aboutFoundingThesis } from "@/content/about";

/**
 * — 02 Why ASTA exists.
 * Band A: offset narrative column with chart-margin whitespace (the loudest
 * element). Band B: three structurally identical pressure cards. Band C:
 * principle pills + the response line on a 2px INK rule (never accent).
 */
export function AboutFoundingThesis() {
  return (
    <section className="py-section">
      <Container>
        <SectionHeader
          number="02"
          label={aboutFoundingThesis.eyebrow}
          headline={aboutFoundingThesis.heading}
          lede={aboutFoundingThesis.sub}
          headlineMax="max-w-[26ch]"
        />

        {/* Band A — offset narrative */}
        <div className="mt-16 grid grid-cols-12 gap-x-6">
          <div aria-hidden className="relative hidden lg:col-span-4 lg:block">
            <span className="absolute inset-y-0 right-0 w-px bg-hairline" />
          </div>
          <Reveal className="col-span-12 lg:col-span-7 lg:col-start-6">
            <div className="flex max-w-measure flex-col gap-6">
              {aboutFoundingThesis.narrative.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="font-body text-body-lg text-pretty text-ink-2">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Band B — founding pressures */}
        <Reveal stagger className="mt-16 grid auto-rows-fr items-stretch gap-6 md:grid-cols-3">
          {aboutFoundingThesis.pressures.map((pressure, i) => (
            <RevealItem key={pressure.title} className="h-full">
              <Card>
                <CardMeta number={String(i + 1).padStart(2, "0")} label="Founding pressure" />
                <CardTitle>{pressure.title}</CardTitle>
                <CardBody>{pressure.body}</CardBody>
              </Card>
            </RevealItem>
          ))}
        </Reveal>

        {/* Band C — principles + response */}
        <div className="mt-12">
          <div className="flex flex-wrap gap-3">
            {aboutFoundingThesis.principles.map((principle) => (
              <Pill key={principle}>{principle}</Pill>
            ))}
          </div>
          <p className="mt-8 max-w-measure border-l-2 border-ink pl-6 font-body text-body-lg text-pretty text-ink">
            {aboutFoundingThesis.response}
          </p>
        </div>
      </Container>
    </section>
  );
}
