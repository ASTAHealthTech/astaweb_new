import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { solutionsCta } from "@/content/solutions";

export function SolutionsCTA() {
  return (
    <section
      id="solutions-cta"
      className="relative overflow-hidden bg-canvas py-24 md:py-32 lg:py-40 dark:bg-[#060816]"
    >
      {/* ── BG light ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 dark:hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,22,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(10,22,40,0.04) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/[0.07] blur-[130px]" />
        <div className="absolute right-[15%] top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-violet-400/[0.05] blur-[100px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/70 to-transparent" />
      </div>

      {/* ── BG dark ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden dark:block">
        <div className="absolute inset-0 bg-grid-fine bg-[length:44px_44px] opacity-50" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/[0.11] blur-[150px]" />
        <div className="absolute right-[18%] top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-violet-500/[0.07] blur-[120px]" />
        <div className="absolute left-[20%] top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-cyan-400/[0.05] blur-[100px]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(6,8,22,0.85) 100%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">

          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.10] dark:bg-white/[0.06] dark:text-cyan-300/80">
              <Icon name="spark" className="h-3 w-3 text-brand-500 dark:text-cyan-400" />
              {solutionsCta.eyebrow}
            </div>
          </Reveal>

          <Reveal delay={0.07}>
            <h2 className="mt-6 text-h1 font-semibold leading-[1.06] tracking-[-0.045em] text-balance md:text-display">
              <span className="text-ink dark:hidden">{solutionsCta.heading}</span>
              <span
                className="hidden bg-clip-text text-transparent dark:inline"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg,#F0F4FF 0%,rgba(240,244,255,0.60) 100%)",
                }}
              >
                {solutionsCta.heading}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.13}>
            <p className="mt-5 text-body-lg text-pretty leading-relaxed text-ink-muted dark:text-frost-muted">
              {solutionsCta.sub}
            </p>
          </Reveal>

          <Reveal delay={0.20}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button href={solutionsCta.primaryCta.href} variant="glow" size="xl" trailingIcon>
                {solutionsCta.primaryCta.label}
              </Button>
              <Button href={solutionsCta.secondaryCta.href} variant="secondary" size="xl">
                {solutionsCta.secondaryCta.label}
              </Button>
            </div>
          </Reveal>

        </div>
      </Container>
    </section>
  );
}
