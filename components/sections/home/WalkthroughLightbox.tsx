"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bezel } from "@/components/ui/Bezel";

/**
 * §01 — quiet text link under the instrument that opens the walkthrough
 * in a lightbox: dimmed paper scrim, video mounted in a Bezel (neutral
 * chrome dot — recorded footage is never marked live), Esc/backdrop
 * close, basic focus trap.
 */
export function WalkthroughLink() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        // basic trap: cycle focus within the dialog
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button, video, [href], [tabindex]:not([tabindex='-1'])"
        );
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-1.5 font-body text-body text-ink decoration-accent decoration-2 underline-offset-4 hover:underline"
      >
        <span>Watch the product walkthrough</span>
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-paper/80 p-6 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Live ward walkthrough video"
        >
          <div
            ref={dialogRef}
            className="w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex justify-end">
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="rounded-pill border border-hairline bg-surface px-4 py-1.5 font-body text-label text-ink transition-colors duration-200 hover:border-hairline-strong"
              >
                Close ✕
              </button>
            </div>
            <Bezel
              label="asta — product walkthrough"
              timestamp="848×636"
              caption="Fig. 1 — Live ward walkthrough"
            >
              <video
                src="/walkthrough.mp4"
                poster="/walkthrough-poster.jpg"
                controls
                autoPlay
                playsInline
                width={848}
                height={636}
                className="mx-auto max-h-[70vh] w-auto object-contain"
              />
            </Bezel>
          </div>
        </div>
      )}
    </>
  );
}
