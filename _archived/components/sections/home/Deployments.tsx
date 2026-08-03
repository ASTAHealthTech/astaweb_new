import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { deployments } from "@/content/home";

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

export function Deployments() {
  const states = new Set(deployments.items.map((d) => d.state));
  const cities = new Set(deployments.items.map((d) => d.city));

  return (
    <section id="deployments" className="bg-bg-alt py-20 dark:bg-night md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={deployments.eyebrow}
            heading={deployments.heading}
            sub={deployments.sub}
          />
        </Reveal>

        {/* Stats */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-[1.75rem] font-semibold text-fg dark:text-frost">{deployments.items.length}</div>
              <div className="text-[0.72rem] text-fg-subtle dark:text-frost/35">Hospitals</div>
            </div>
            <div className="text-center">
              <div className="text-[1.75rem] font-semibold text-fg dark:text-frost">{states.size}</div>
              <div className="text-[0.72rem] text-fg-subtle dark:text-frost/35">States</div>
            </div>
            <div className="text-center">
              <div className="text-[1.75rem] font-semibold text-fg dark:text-frost">{cities.size}</div>
              <div className="text-[0.72rem] text-fg-subtle dark:text-frost/35">Cities</div>
            </div>
          </div>
        </Reveal>

        {/* Hospital list */}
        <Reveal delay={0.16}>
          <div className="mx-auto mt-10 max-w-2xl divide-y divide-line rounded-2xl border border-border bg-white dark:divide-line-dark dark:border-night-edge dark:bg-night-panel">
            {deployments.items.map((hospital) => {
              const logoSrc = HOSPITAL_LOGOS[hospital.name];
              return (
                <div key={hospital.name} className="flex items-center gap-4 px-5 py-3.5">
                  {/* Logo */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-bg-alt dark:bg-night-edge">
                    {logoSrc ? (
                      <Image src={logoSrc} alt={hospital.name} width={28} height={28} className="h-7 w-7 object-contain" unoptimized />
                    ) : (
                      <span className="text-[0.65rem] font-bold text-fg-subtle dark:text-frost/30">
                        {hospital.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.8125rem] font-semibold text-fg dark:text-frost">{hospital.name}</span>
                      <span className="rounded-md bg-brand-500/10 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase text-brand-600 dark:text-brand-400">
                        {hospital.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[0.72rem] text-fg-subtle dark:text-frost/35">
                      <Icon name="map-pin" className="h-3 w-3" />
                      {hospital.city}, {hospital.state}
                    </div>
                  </div>

                  {/* Link */}
                  <a
                    href={hospital.website}
                    target="_blank" rel="noreferrer"
                    aria-label={`Visit ${hospital.name} website`}
                    className="hidden items-center gap-1 text-[0.72rem] text-fg-subtle transition-colors hover:text-fg sm:flex dark:text-frost/30 dark:hover:text-frost/60"
                  >
                    {hostname(hospital.website)}
                    <Icon name="arrow-right" className="h-3 w-3" />
                  </a>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[0.72rem] text-fg-subtle dark:text-frost/30">
            {deployments.publicNote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
