import type { ReactNode } from "react";

/**
 * Numbered legal section block for the privacy / terms pages.
 * Server-rendered; no motion — legal text is read, not performed.
 */
export function LegalBlock({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-hairline pt-6">
      <div className="flex items-baseline gap-3">
        <span aria-hidden className="font-display text-label tnum text-ink-3">
          — {number}
        </span>
        <h2 className="font-display text-title-sm text-ink">{title}</h2>
      </div>
      <div className="mt-4 max-w-measure space-y-3">{children}</div>
    </section>
  );
}

export function LegalBody({ children }: { children: ReactNode }) {
  return (
    <p className="font-body text-body leading-relaxed text-ink-2 text-pretty">
      {children}
    </p>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 font-body text-body leading-relaxed text-ink-2"
        >
          <span
            aria-hidden
            className="mt-[0.75em] block h-px w-3 shrink-0 bg-hairline-strong"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
