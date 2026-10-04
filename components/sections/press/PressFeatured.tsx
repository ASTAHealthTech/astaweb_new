import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tilt } from "@/components/ui/Tilt";
import { featuredOutlets, moreOutlets, pressRelease, type Outlet } from "@/content/press";

const visits = (n: number) => n.toLocaleString("en-US");
const TONES = ["#F09030", "#DE2588", "#8A4FE0"];

/** The outlet's name, set in the site's own type — a wordmark, never a logo. */
function Wordmark({ name, big = false }: { name: string; big?: boolean }) {
  return (
    <span className={["font-display font-medium tracking-[-0.02em] text-ink", big ? "text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.02]" : "text-[1.35rem] leading-tight"].join(" ")}>
      {name}
    </span>
  );
}

function OutletCard({ o, tone }: { o: Outlet; tone: string }) {
  return (
    <a href={o.url} target="_blank" rel="noopener noreferrer" className="group block h-full" aria-label={`Read the article in ${o.name} (opens in a new tab)`}>
      <Tilt max={4}>
        <div className="relative flex h-full flex-col rounded-card border border-hairline bg-surface p-6 transition-colors duration-200 group-hover:border-hairline-strong">
          <span aria-hidden className="absolute left-6 top-0 h-px w-10 origin-left scale-x-50 transition-transform duration-300 group-hover:scale-x-100" style={{ background: tone }} />
          <span className="machine text-ink-3">{o.note ?? o.kind}</span>
          <div className="mt-4"><Wordmark name={o.name} /></div>
          <div className="mt-auto flex items-end justify-between gap-4 pt-8">
            <div>
              <div className="font-machine text-[15px] tabular-nums text-ink">{visits(o.visits)}</div>
              <div className="machine mt-1 text-ink-3">visits / month</div>
            </div>
            <span className="font-body text-[14px] text-ink-2 transition-colors group-hover:text-ink">
              Read <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </Tilt>
    </a>
  );
}

/**
 * — 02 Where it ran. One lead placement at full width, eleven more in a
 * grid, and a twelfth tile that hands off to the full list.
 */
export function PressFeatured() {
  const [lead, ...rest] = featuredOutlets;
  return (
    <section className="py-section-sm">
      <Container>
        <SectionHeader number="02" label="Where it ran" headline="Twelve outlets to start with." lede="The largest by estimated monthly visits, led by the one national English daily on the list." />

        <Reveal className="mt-12">
          <a href={lead.url} target="_blank" rel="noopener noreferrer" className="group block" aria-label={`Read the article in ${lead.name} (opens in a new tab)`}>
            <Tilt max={2.5}>
              <div className="relative overflow-hidden rounded-card border border-hairline bg-surface p-7 transition-colors duration-200 group-hover:border-hairline-strong md:p-10">
                <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-brand-gradient" />
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end">
                  <div>
                    <span className="machine text-accent">Lead placement</span>
                    <div className="mt-4"><Wordmark name={lead.name} big /></div>
                    <p className="mt-3 font-body text-body text-ink-2">{lead.note}</p>
                    <p className="mt-7 max-w-[46ch] border-l border-hairline-strong pl-4 font-display text-[1.15rem] leading-snug text-ink">
                      {pressRelease.title}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-5 lg:flex-col lg:items-end lg:text-right">
                    <div>
                      <div className="font-display text-[clamp(2rem,3.4vw,2.9rem)] font-medium leading-none tabular-nums tracking-[-0.02em] text-ink">{visits(lead.visits)}</div>
                      <div className="machine mt-2 text-ink-3">visits / month · estimated</div>
                    </div>
                    <span className="inline-flex h-11 items-center gap-2.5 whitespace-nowrap rounded-pill border border-hairline px-5 font-body text-[14px] font-medium text-ink transition-colors group-hover:border-hairline-strong group-hover:bg-well">
                      Read the article <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </Tilt>
          </a>
        </Reveal>

        <Reveal stagger className="mt-6 grid auto-rows-fr items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((o, i) => (
            <OutletCard key={o.name} o={o} tone={TONES[i % 3]} />
          ))}
          <a href="#all-coverage" className="group flex h-full flex-col justify-between rounded-card border border-dashed border-hairline-strong p-6 transition-colors duration-200 hover:bg-surface">
            <span className="machine text-ink-3">And the rest</span>
            <div className="mt-4 font-display text-[clamp(2rem,3vw,2.6rem)] font-medium leading-none tracking-[-0.02em] text-gradient-brand">+{moreOutlets.length}</div>
            <span className="mt-8 font-body text-[14px] text-ink-2 transition-colors group-hover:text-ink">
              more outlets, all linked <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-y-0.5">↓</span>
            </span>
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
