import Image from "next/image";
import { Card } from "@/components/ui/Card";

type Person = {
  name: string;
  photo: string;
  title: string;
  badge: string;
  headline: string;
  body: string;
  contribution: string;
  linkedin?: string;
  scholar?: string;
};

/** Small footer link: ink label, magenta underline on hover, arrow shifts. */
function PersonLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex items-center gap-1.5 font-body text-label text-ink decoration-accent decoration-2 underline-offset-4 hover:underline"
    >
      <span>{children}</span>
      <span aria-hidden className="transition-transform duration-200 group-hover/link:translate-x-1">
        →
      </span>
    </a>
  );
}

/**
 * The one people card — used identically by Leadership (§03) and Advisory
 * board (§04). 4:5 grayscale portrait in its own hairline frame; equal
 * heights are mechanical (auto-rows-fr grid + h-full + mt-auto footer).
 */
export function PersonCard({ person, number }: { person: Person; number: string }) {
  return (
    <Card padded={false} className="group">
      <div className="p-2 pb-0">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] border border-hairline">
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover grayscale contrast-[1.05] transition-[filter] duration-300 group-hover:grayscale-[0.2]"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-display text-label tnum text-ink-3">{number}</span>
          <span className="text-right font-body text-label text-ink-2">{person.badge}</span>
        </div>

        <h3 className="mt-3 font-display text-title-sm text-ink">{person.name}</h3>
        <div className="mt-1 font-body text-label text-ink-3">{person.title}</div>

        <p className="mt-3 font-body text-body text-ink">{person.headline}</p>
        <p className="mb-5 mt-2 font-body text-body text-ink-2">{person.body}</p>

        <div className="mt-auto border-t border-hairline pt-4">
          <p className="font-body text-label text-ink-2">{person.contribution}</p>
          <div className="mt-3 flex items-center gap-4">
            {person.linkedin && <PersonLink href={person.linkedin}>LinkedIn</PersonLink>}
            {person.scholar && <PersonLink href={person.scholar}>Scholar</PersonLink>}
          </div>
        </div>
      </div>
    </Card>
  );
}
