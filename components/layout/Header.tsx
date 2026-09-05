"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { primaryNav } from "@/content/nav";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/cn";

/**
 * Calm header: transparent on paper at rest; after 8px of scroll it gains a
 * paper-tinted blur and one hairline. No shrinking, no hide-on-scroll.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 8);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function isActive(href: string) {
    if (href === ROUTES.home) return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <a
        href="#content"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-pill border border-hairline bg-paper px-4 py-2 font-body text-label text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
          scrolled || open
            ? "border-b border-hairline bg-paper/90 backdrop-blur-[8px]"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between md:h-[72px]">
            <Link
              href={ROUTES.home}
              aria-label="ASTA Health Tech home"
              className="flex items-center gap-2.5"
            >
              <Image
                src="/logo/logo-asta.png"
                alt="ASTA Health Tech"
                width={1280}
                height={723}
                priority
                sizes="132px"
                className="h-auto w-[118px] brightness-0 invert md:w-[132px]"
              />
            </Link>

            {/* Desktop nav — consumes primaryNav verbatim */}
            <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "border-b pb-0.5 font-body text-[15px] transition-colors duration-200",
                    isActive(item.href)
                      ? "border-hairline-strong text-ink"
                      : "border-transparent text-ink-2 hover:text-ink"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:block">
              <Button size="sm" href={ROUTES.demo}>
                Request a demo
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={cn(
                  "block h-px w-[18px] bg-ink transition-transform duration-200",
                  open && "translate-y-[3px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-px w-[18px] bg-ink transition-transform duration-200",
                  open && "-translate-y-[3px] -rotate-45"
                )}
              />
            </button>
          </div>
        </Container>

        {/* Mobile menu — a full-screen numbered ledger */}
        <div
          className={cn(
            "fixed inset-x-0 bottom-0 top-16 bg-paper transition-opacity duration-200 lg:hidden",
            open ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <Container className="flex h-full flex-col pb-8 pt-4">
            <nav className="flex-1 overflow-y-auto" aria-label="Mobile">
              {primaryNav.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-hairline py-5"
                >
                  <span className="font-display text-[16px] tnum text-ink-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-display-2 text-ink">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
            <div className="pt-6">
              <Button href={ROUTES.demo} className="w-full">
                Request a demo
              </Button>
            </div>
          </Container>
        </div>
      </header>
    </>
  );
}
