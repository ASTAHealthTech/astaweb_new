"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { featuredOutlets, moreOutlets } from "@/content/press";

const FIRST = 24;

/**
 * — 04 All coverage. Every outlet, linked. The long tail stays folded until
 * asked for, and the search looks across the featured twelve as well.
 */
export function PressAll() {
  const all = useMemo(() => [...featuredOutlets, ...moreOutlets], []);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const needle = q.trim().toLowerCase();
  const hits = needle ? all.filter((o) => o.name.toLowerCase().includes(needle)) : all;
  const shown = needle || open ? hits : hits.slice(0, FIRST);

  return (
    <section id="all-coverage" className="scroll-mt-24 py-section-sm">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader number="04" label="All coverage" headline={`All ${all.length} outlets, linked.`} />
          <label className="block w-full lg:w-80">
            <span className="machine mb-2 block text-ink-3">Find an outlet</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Type a name, e.g. Guardian"
              className="h-11 w-full rounded-card border border-hairline bg-surface px-4 font-body text-[14px] text-ink placeholder:text-ink-3 focus:border-hairline-strong focus:outline-none"
            />
          </label>
        </div>

        <p className="machine mt-8 text-ink-3" aria-live="polite">
          {needle ? `${hits.length} match${hits.length === 1 ? "" : "es"}` : `showing ${shown.length} of ${all.length}`}
        </p>

        <ul className="mt-3 grid gap-x-8 border-t border-hairline sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((o) => (
            <li key={o.url} className="border-b border-hairline">
              <a href={o.url} target="_blank" rel="noopener noreferrer" className="group flex items-baseline justify-between gap-4 py-3">
                <span className="font-body text-[14.5px] text-ink-2 transition-colors group-hover:text-ink">{o.name}</span>
                <span aria-hidden className="font-body text-[13px] text-ink-3 transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:text-accent">↗</span>
              </a>
            </li>
          ))}
        </ul>

        {needle && hits.length === 0 ? (
          <p className="mt-6 font-body text-body text-ink-2">No outlet by that name. Try a shorter word.</p>
        ) : null}

        {!needle && hits.length > FIRST ? (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-8 inline-flex h-11 items-center gap-2.5 rounded-pill border border-hairline px-5 font-body text-[14px] font-medium text-ink transition-colors hover:border-hairline-strong hover:bg-surface"
          >
            {open ? "Show fewer" : `Show all ${all.length}`}
          </button>
        ) : null}
      </Container>
    </section>
  );
}
