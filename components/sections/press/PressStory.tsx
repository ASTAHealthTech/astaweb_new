import { Container } from "@/components/layout/Container";
import { LedgerTick } from "@/components/ui/LedgerTick";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { pressFacts, pressStory } from "@/content/press";
import { ROUTES } from "@/lib/constants";

/** — 03 What the release says: four parts and the three numbers under them. */
export function PressStory() {
  return (
    <section className="relative py-section-sm">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(12,8,18,0) 0%, rgba(12,8,18,0.82) 16%, rgba(12,8,18,0.82) 84%, rgba(12,8,18,0) 100%)" }} />
      <Container className="relative">
        <SectionHeader number="03" label="The story in brief" headline="What the release says." lede="Four parts, shortened from the announcement as published." />

        <Reveal stagger className="mt-12 grid gap-x-10 gap-y-0 md:grid-cols-2">
          {pressStory.map((p) => (
            <article key={p.n} className="border-t border-hairline py-7">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-label tnum text-ink-3">{p.n}</span>
                <h3 className="font-display text-[1.3rem] font-medium leading-snug tracking-[-0.015em] text-ink">{p.head}</h3>
              </div>
              <p className="mt-3 pl-9 font-body text-body text-pretty text-ink-2">{p.body}</p>
            </article>
          ))}
        </Reveal>

        <dl className="grid grid-cols-3 border-y border-hairline">
          {pressFacts.map((f, i) => (
            <div key={f.label} className={["py-6", i > 0 ? "border-l border-hairline pl-4 sm:pl-7" : "pr-2"].join(" ")}>
              <dt className="font-display text-[clamp(1.5rem,2.6vw,2.2rem)] font-medium leading-none tracking-[-0.02em] text-ink">
                <LedgerTick value={f.value} />
              </dt>
              <dd className="machine mt-2.5 text-ink-2">{f.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={ROUTES.platform} variant="secondary">See how the platform works</Button>
        </div>
      </Container>
    </section>
  );
}
