import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DrawLines } from "@/components/ui/DrawLines";
import { platformDeploymentArchitecture } from "@/content/platform";

export function PlatformDeploymentArchitecture() {
  const { stages, principles, footer } = platformDeploymentArchitecture;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="text-center">
            <h2 className="mx-auto max-w-[640px] text-[1.8rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost md:text-[2.375rem]">
              Rapid hospital deployment <span className="text-accent">in 4 steps</span>.
            </h2>
            <p className="mx-auto mt-3 max-w-[480px] text-[0.9375rem] leading-relaxed text-fg-muted dark:text-frost-muted">
              Designed to deploy on existing hospital equipment without complex hardware installation.
            </p>
          </div>
        </Reveal>

        {/* 4 Stages Bento Grid */}
        <Reveal delay={0.08}>
          <div className="mt-12 grid overflow-hidden rounded-xl border border-border dark:border-night-edge sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((s, i) => (
              <div key={s.title} className="relative flex flex-col justify-between bg-bg p-6 dark:bg-night">
                {/* Typographic Anchoring Number */}
                <span className="pointer-events-none absolute right-4 top-2 font-mono text-[3rem] font-bold text-neutral-200/50 dark:text-white/[0.04]">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-[0.95rem] font-semibold text-fg dark:text-frost">{s.title}</h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-fg-muted dark:text-frost-muted">{s.body}</p>
                </div>
                {i < stages.length - 1 && <DrawLines className="right-0 hidden lg:block" delay={i * 100} />}
                {i % 2 !== 1 && <DrawLines className="right-0 hidden sm:block lg:hidden" delay={i * 100} />}
                {i < stages.length - 2 && <DrawLines horizontal className="bottom-0 hidden sm:block lg:hidden" delay={i * 100} />}
                {i < stages.length - 1 && <DrawLines horizontal className="bottom-0 sm:hidden" delay={i * 100} />}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Principles Grid */}
        <Reveal delay={0.12}>
          <div className="mt-6 grid overflow-hidden rounded-xl border border-border dark:border-night-edge sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <div key={p.title} className="relative flex flex-col justify-between bg-bg p-6 dark:bg-night">
                <div>
                  <h3 className="text-[0.9rem] font-semibold text-fg dark:text-frost">{p.title}</h3>
                  <p className="mt-1.5 text-[0.78rem] leading-relaxed text-fg-muted dark:text-frost-muted">{p.body}</p>
                </div>
                {i < principles.length - 1 && <DrawLines className="right-0 hidden lg:block" delay={i * 100} />}
                {i % 2 !== 1 && <DrawLines className="right-0 hidden sm:block lg:hidden" delay={i * 100} />}
                {i < principles.length - 2 && <DrawLines horizontal className="bottom-0 hidden sm:block lg:hidden" delay={i * 100} />}
                {i < principles.length - 1 && <DrawLines horizontal className="bottom-0 sm:hidden" delay={i * 100} />}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-8 max-w-[560px] text-center text-[0.8125rem] text-fg-subtle dark:text-frost-muted">{footer}</p>
        </Reveal>
      </Container>
    </section>
  );
}
