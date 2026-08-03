import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { aboutAdvisoryBoard } from "@/content/about";

export function AboutAdvisoryBoard() {
  const { members } = aboutAdvisoryBoard;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="text-center">
            <h2 className="mx-auto max-w-[640px] text-[1.8rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost md:text-[2.375rem]">
              Expert guidance where hospital AI <span className="text-accent">needs it most</span>.
            </h2>
            <p className="mx-auto mt-3 max-w-[480px] text-[0.9375rem] leading-relaxed text-fg-muted dark:text-frost-muted">
              ASTA&apos;s advisory board combines senior clinical leaders, medical informatics researchers, and critical care specialists.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border dark:border-night-edge dark:bg-night-edge sm:grid-cols-2 lg:grid-cols-4">
            {members.map((person) => (
              <div key={person.name} className="flex flex-col justify-between bg-bg p-6 dark:bg-night">
                <div>
                  <div className="relative mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border border-border bg-white dark:border-night-edge dark:bg-night-panel">
                    <Image
                      src={person.photo}
                      alt={person.name}
                      width={160}
                      height={160}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="text-center text-[0.95rem] font-semibold text-fg dark:text-frost">
                    {person.name}
                  </h3>
                  <p className="mt-0.5 text-center text-[0.78rem] font-medium text-accent">
                    {person.title}
                  </p>
                  <div className="mt-2 flex justify-center">
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[0.68rem] font-semibold text-accent">
                      {person.badge}
                    </span>
                  </div>
                  <p className="mt-3 text-[0.8rem] leading-relaxed text-fg-muted dark:text-frost-muted">
                    {person.headline}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 pt-3 border-t border-border/60 dark:border-night-edge/60">
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${person.name} LinkedIn`}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-fg-subtle transition-colors hover:text-accent dark:border-night-edge dark:text-frost-muted"
                    >
                      <Icon name="linkedin" className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {person.scholar && (
                    <a
                      href={person.scholar}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${person.name} Scholar`}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-fg-subtle transition-colors hover:text-accent dark:border-night-edge dark:text-frost-muted"
                    >
                      <Icon name="globe" className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
