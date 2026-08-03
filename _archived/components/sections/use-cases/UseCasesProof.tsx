import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DrawLines } from "@/components/ui/DrawLines";
import { Icon } from "@/components/ui/Icon";
import { useCasesLiveProof } from "@/content/use-cases";

const HOSPITAL_LOGOS: Record<string, string> = {
  "Southern Railway HQ Hospital": "/hospitals/southern-railway-hq.jpeg",
  "Karnataka ENT Hospital": "/hospitals/karnataka-ent.jpg",
  "Aksha Hospital": "/hospitals/aksha.png",
  "Seethapathy Clinic": "/hospitals/seethapathy.png",
  "K.S. Hospital": "/hospitals/ks.png",
  "Sugam Hospital": "/hospitals/sugam.png",
  "Anbu Hospital": "/hospitals/anbu.png",
};

function hostname(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
}

export function UseCasesProof() {
  return (
    <section id="live-hospital-proof" className="py-16 md:py-24">
      <Container>
        {/* Header */}
        <Reveal>
          <div className="text-center">
            <h2 className="mx-auto max-w-[640px] text-[1.8rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost md:text-[2.375rem]">
              Live hospital deployments <span className="text-accent">in active patient care</span>.
            </h2>
            <p className="mx-auto mt-3 max-w-[480px] text-[0.9375rem] leading-relaxed text-fg-muted dark:text-frost-muted">
              ASTA is deployed across real hospital wards, reading monitors and escalating deterioration signals daily.
            </p>
          </div>
        </Reveal>

        {/* 4 Metrics Strip - Bento Grid */}
        <Reveal delay={0.08}>
          <div className="mt-12 grid overflow-hidden rounded-xl border border-border dark:border-night-edge sm:grid-cols-4">
            {useCasesLiveProof.metrics.map((metric, index) => (
              <div key={metric.label} className="relative bg-bg p-6 text-center dark:bg-night">
                <div className="font-mono text-[2.25rem] font-bold tracking-[-0.04em] text-accent">
                  {metric.value}
                </div>
                <p className="mt-1 text-[0.78rem] text-fg-muted dark:text-frost-muted">{metric.label}</p>
                
                {index < useCasesLiveProof.metrics.length - 1 && <DrawLines className="right-0 hidden sm:block" delay={index * 100} />}
                {index < useCasesLiveProof.metrics.length - 1 && <DrawLines horizontal className="bottom-0 sm:hidden" delay={index * 100} />}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 overflow-hidden rounded-xl border border-border dark:border-night-edge">
            {useCasesLiveProof.hospitals.map((hospital, i) => {
              const logoSrc = HOSPITAL_LOGOS[hospital.name];

              return (
                <div key={hospital.name} className={`relative flex flex-col justify-between bg-bg p-6 dark:bg-night ${i < 3 ? "md:col-span-4 lg:col-span-4" : "md:col-span-6 lg:col-span-3"}`}>
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white dark:border-night-edge dark:bg-night-panel">
                        {logoSrc ? (
                          <Image
                            src={logoSrc}
                            alt={hospital.name}
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain"
                            unoptimized
                          />
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-[0.65rem] font-bold text-white">
                            {hospital.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-[0.65rem] font-semibold text-accent">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        Live
                      </span>
                    </div>

                    <h3 className="mt-4 text-[0.95rem] font-semibold text-fg dark:text-frost">
                      {hospital.name}
                    </h3>
                    <p className="mt-0.5 text-[0.78rem] text-fg-subtle dark:text-frost-muted">
                      {hospital.city}, {hospital.state}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="rounded-md border border-border bg-white px-2 py-0.5 text-[0.7rem] font-medium text-fg-muted dark:border-night-edge dark:bg-night-panel dark:text-frost-muted">
                        {hospital.careContext}
                      </span>
                      <span className="rounded-md border border-border bg-white px-2 py-0.5 text-[0.7rem] text-fg-subtle dark:border-night-edge dark:bg-night-panel dark:text-frost-muted">
                        {hospital.deploymentFit}
                      </span>
                    </div>
                  </div>

                  <div className="relative mt-5 flex items-center justify-between pt-3 text-[0.75rem]">
                    <DrawLines horizontal className="top-0" delay={i * 100} />
                    <span className="font-mono font-medium text-accent">
                      Since {hospital.liveSince}
                    </span>
                    <a
                      href={hospital.website}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-fg-subtle transition-colors hover:text-accent dark:text-frost-muted"
                    >
                      {hostname(hospital.website)}
                      <Icon name="arrow-right" className="h-3 w-3" />
                    </a>
                  </div>
                  
                  {/* Outer boundaries */}
                  <DrawLines className="right-0 hidden md:block" delay={i * 100} />
                  <DrawLines horizontal className="bottom-0" delay={i * 100} />
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-4 text-[0.78rem] text-fg-subtle dark:text-frost-muted">
            {useCasesLiveProof.note}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
