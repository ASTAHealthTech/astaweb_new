import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { teachingHospitalValue } from "@/content/use-cases";

const PATH_NUMS = ["01", "02", "03", "04"];

export function UseCasesAcademicValue() {
  return (
    <section
      id="teaching-hospital-value"
      className="relative overflow-hidden bg-canvas py-24 md:py-32 dark:bg-[#060816]"
    >
      {/* ── BG ── */}
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
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent dark:via-white/[0.04]" />
        <div className="absolute left-[12%] top-1/3 h-[360px] w-[360px] rounded-full bg-violet-500/[0.03] blur-[120px] dark:bg-violet-500/[0.07]" />
        <div className="absolute right-[10%] bottom-1/4 h-[300px] w-[300px] rounded-full bg-brand-500/[0.02] blur-[100px] dark:bg-brand-500/[0.05]" />
      </div>

      <Container className="relative">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#040810] text-white">

            {/* Glow */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-12 top-0 h-56 w-56 rounded-full bg-violet-500/[0.09] blur-[90px]" />
              <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-brand-500/[0.07] blur-[80px]" />
            </div>

            {/* Top shine */}
            <div
              aria-hidden
              className="absolute inset-x-[5%] top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(124,92,255,0.55),rgba(79,107,255,0.35),transparent)",
              }}
            />

            {/* ── MAIN SPLIT ── */}
            <div className="relative grid lg:grid-cols-[1fr_1px_1fr]">

              {/* Left — heading + sub + audience tags */}
              <div className="flex flex-col justify-center gap-5 p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  {teachingHospitalValue.eyebrow}
                </div>
                <h2 className="text-balance text-h2 font-semibold tracking-[-0.04em] text-frost md:text-h2-lg">
                  {teachingHospitalValue.heading}
                </h2>
                <p className="text-[0.85rem] leading-relaxed text-white/50">
                  {teachingHospitalValue.sub}
                </p>
                <div className="flex flex-wrap gap-2">
                  {teachingHospitalValue.audiences.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[0.71rem] font-medium text-white/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="hidden bg-white/[0.05] lg:block" />

              {/* Right — 4 pillar 2×2 cards */}
              <div className="border-t border-white/[0.05] p-8 lg:border-t-0 lg:p-10">
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.20em] text-white/28">
                    Academic pillars
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {teachingHospitalValue.pillars.map((pillar) => (
                    <div
                      key={pillar.title}
                      className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.025] p-4"
                    >
                      <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-px"
                        style={{
                          background: `linear-gradient(to right,transparent,${pillar.color}65,transparent)`,
                        }}
                      />
                      <span
                        className="inline-flex rounded-full px-2 py-0.5 font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em]"
                        style={{ background: pillar.color + "14", color: pillar.color }}
                      >
                        {pillar.stat}
                      </span>
                      <h3 className="mt-3 text-[0.84rem] font-semibold leading-snug tracking-[-0.02em] text-frost">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 text-[0.72rem] leading-relaxed text-white/40">
                        {pillar.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ── VALUE PATH ── */}
            <div className="relative border-t border-white/[0.05] px-8 py-6 lg:px-10">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                <span className="font-mono text-[9px] uppercase tracking-[0.20em] text-white/28">
                  Value path
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {teachingHospitalValue.pathway.map((step, i) => (
                  <div key={step.title} className="flex items-start gap-3">
                    <span
                      className="flex h-6 w-6 flex-none items-center justify-center rounded-md font-mono text-[0.58rem] font-bold text-white"
                      style={{
                        background: "linear-gradient(135deg,#4F6BFF,#7C5CFF)",
                      }}
                    >
                      {PATH_NUMS[i]}
                    </span>
                    <div>
                      <div className="text-[0.78rem] font-semibold leading-snug text-frost">
                        {step.title.replace(/^\d\.\s/, "")}
                      </div>
                      <p className="mt-0.5 text-[0.7rem] leading-relaxed text-white/38">
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Reveal>
      </Container>
    </section>
  );
}
