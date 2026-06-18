"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { useTheme } from "@/components/providers/ThemeProvider";

const LOGIN_URL = "https://web.astahealthtech.co.in/";

const NAV_ITEMS = [
  { label: "Home",      href: ROUTES.home },
  { label: "Solutions", href: ROUTES.solutions },
  { label: "Platform",  href: ROUTES.platform },
  { label: "Use Cases", href: ROUTES.useCases },
  { label: "About",     href: ROUTES.about },
  { label: "Blog",      href: "/blog" },
];

const HEADER_STYLES = `
  @keyframes hdr-scan {
    0%   { transform: translateX(-100%); opacity: 0; }
    10%  { opacity: 1; }
    80%  { opacity: 1; }
    100% { transform: translateX(220%); opacity: 0; }
  }
`;

export function Header() {
  const [overHero, setOverHero] = useState(true);
  const [open, setOpen] = useState(false);
  const { isDark, toggle } = useTheme();
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    let frame = 0;

    const syncHeaderSurface = () => {
      const hero = document.querySelector<HTMLElement>("[data-hero-root]");
      if (!hero) { setOverHero(false); return; }
      const headerHeight = window.innerWidth >= 768 ? 80 : 72;
      const { bottom } = hero.getBoundingClientRect();
      setOverHero(bottom > headerHeight + 24);
    };

    const requestSync = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        syncHeaderSurface();
      });
    };

    requestSync();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, []);

  const solidHeader = open || !overHero;
  const chromeDark = overHero || isDark;

  function isActive(href: string) {
    if (href === ROUTES.home) return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HEADER_STYLES }} />

      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          chromeDark ? "text-white" : "text-ink",
          solidHeader
            ? isDark
              ? "border-b border-white/[0.06] bg-[rgba(7,10,24,0.95)] backdrop-blur-md shadow-[0_10px_28px_-16px_rgba(4,8,24,0.55)]"
              : "border-b border-black/[0.06] bg-white/[0.96] backdrop-blur-sm shadow-[0_4px_24px_-8px_rgba(10,22,40,0.10)]"
            : "border-b border-transparent bg-transparent shadow-none backdrop-blur-0"
        )}
      >
        {/* Scan line */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-[1px] overflow-hidden transition-opacity duration-500",
            solidHeader ? "opacity-100" : "opacity-0"
          )}
        >
          <div
            className="absolute inset-y-0 w-1/2"
            style={{
              background:
                "linear-gradient(to right,transparent,rgba(79,107,255,0.70) 40%,rgba(73,198,255,0.80) 60%,transparent)",
              animation: "hdr-scan 7s ease-in-out 1s infinite",
            }}
          />
        </div>

        {/* Bottom accent line */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent transition-opacity duration-500",
            solidHeader ? "opacity-100" : "opacity-0"
          )}
        />

        <Container className="relative">

          {/* ── Mobile bar ── */}
          <div className="flex h-[72px] items-center md:hidden">
            {/* Left: theme toggle for visual balance */}
            <ThemeToggle isDark={isDark} onToggle={toggle} chromeDark={chromeDark} />

            {/* Center: logo */}
            <div className="flex flex-1 justify-center">
              <Link
                href={ROUTES.home}
                className="flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                aria-label="ASTA home"
              >
                <Logo isDark={chromeDark} />
              </Link>
            </div>

            {/* Right: hamburger */}
            <button
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                chromeDark
                  ? "text-frost-subtle hover:bg-white/[0.08] hover:text-frost"
                  : "text-ink-muted hover:bg-ink/[0.06] hover:text-ink"
              )}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <HamburgerIcon open={open} />
            </button>
          </div>

          {/* ── Desktop bar ── */}
          <div className="hidden h-[80px] grid-cols-[auto_1fr_auto] items-center gap-6 md:grid">

            {/* Logo */}
            <Link
              href={ROUTES.home}
              className="flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              aria-label="ASTA home"
            >
              <Logo isDark={chromeDark} />
            </Link>

            {/* Nav */}
            <nav className="flex items-center justify-center gap-0.5" aria-label="Primary navigation">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  isDark={chromeDark}
                  active={isActive(item.href)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <ThemeToggle isDark={isDark} onToggle={toggle} chromeDark={chromeDark} />
              <a
                href={LOGIN_URL}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-lg border px-3.5 text-[0.82rem] font-medium transition-all duration-200",
                  chromeDark
                    ? "border-white/[0.14] text-frost/65 hover:border-white/[0.26] hover:bg-white/[0.06] hover:text-frost"
                    : "border-ink/[0.12] text-ink/60 hover:border-ink/[0.22] hover:bg-ink/[0.04] hover:text-ink"
                )}
              >
                Login
                <ExternalArrow />
              </a>
              <Button href={ROUTES.demo} variant="glow" size="sm" trailingIcon>
                Request demo
              </Button>
            </div>
          </div>

        </Container>

        {/* ── Mobile dropdown ── */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden",
            open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div
            className={cn(
              "border-t",
              isDark ? "border-white/[0.06]" : "border-black/[0.06]"
            )}
          >
            <Container className="pb-6 pt-1">

              {/* Nav list — auto-width, right-aligned */}
              <nav className="flex flex-col items-end gap-0.5 py-2" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-2.5 rounded-2xl px-5 py-2.5 text-[0.96rem] font-medium tracking-[-0.01em] transition-all duration-150",
                        active
                          ? isDark
                            ? "bg-white/[0.07] text-frost"
                            : "bg-ink/[0.06] text-ink"
                          : isDark
                            ? "text-white/42 hover:text-white/80"
                            : "text-ink/42 hover:text-ink"
                      )}
                    >
                      {active && (
                        <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", isDark ? "bg-brand-400" : "bg-brand-500")} />
                      )}
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Divider */}
              <div className={cn("border-t", isDark ? "border-white/[0.06]" : "border-black/[0.05]")} />

              {/* CTAs — auto-width, right-aligned, stacked */}
              <div className="flex flex-col items-end gap-2.5 pt-4">
                <a
                  href={LOGIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-2xl border px-6 py-2.5 text-[0.84rem] font-semibold transition-all duration-150",
                    isDark
                      ? "border-white/[0.10] text-white/48 hover:border-white/[0.22] hover:text-white/80"
                      : "border-ink/[0.10] text-ink/48 hover:border-ink/[0.22] hover:text-ink"
                  )}
                >
                  Login
                  <ExternalArrow />
                </a>
                <Button
                  href={ROUTES.demo}
                  variant="glow"
                  size="sm"
                  trailingIcon
                  onClick={() => setOpen(false)}
                >
                  Request demo
                </Button>
              </div>

            </Container>
          </div>
        </div>

      </header>
    </>
  );
}

function Logo({ isDark }: { isDark: boolean }) {
  return (
    <Image
      src="/logo/logo-asta.png"
      alt="ASTA Health Tech"
      width={1280}
      height={723}
      priority
      sizes="(min-width: 768px) 130px, 118px"
      className={cn(
        "h-auto w-[118px] md:w-[130px]",
        isDark
          ? "brightness-0 invert drop-shadow-[0_2px_12px_rgba(255,255,255,0.12)]"
          : "drop-shadow-[0_1px_1px_rgba(14,21,37,0.08)]"
      )}
    />
  );
}

function NavLink({
  href,
  children,
  isDark,
  active,
}: {
  href: string;
  children: React.ReactNode;
  isDark: boolean;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative overflow-hidden rounded-md px-3.5 py-2 text-[0.855rem] font-medium tracking-[-0.01em] transition-colors duration-200",
        active
          ? isDark
            ? "bg-white/[0.07] text-frost"
            : "bg-ink/[0.06] text-ink"
          : isDark
            ? "text-frost/58 hover:bg-white/[0.06] hover:text-frost"
            : "text-ink/55 hover:bg-ink/[0.05] hover:text-ink"
      )}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "absolute bottom-[5px] left-3.5 right-3.5 h-[1.5px] origin-center rounded-full bg-brand-500 transition-transform duration-300",
          active ? "scale-x-100" : "scale-x-0"
        )}
      />
    </Link>
  );
}

function ExternalArrow() {
  return (
    <svg
      viewBox="0 0 12 12"
      className="h-2.5 w-2.5 opacity-55"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 6h8M6 2l4 4-4 4" />
    </svg>
  );
}

function ThemeToggle({
  isDark,
  onToggle,
  chromeDark,
}: {
  isDark: boolean;
  onToggle: () => void;
  chromeDark: boolean;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
        chromeDark
          ? "bg-white/[0.07] ring-1 ring-white/10 text-frost-muted hover:bg-white/[0.14] hover:text-frost"
          : "bg-ink/[0.06] ring-1 ring-ink/[0.08] text-ink-muted hover:bg-ink/[0.11] hover:text-ink"
      )}
    >
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-300",
          isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 rotate-90 pointer-events-none"
        )}
        aria-hidden
      >
        <SunIcon />
      </span>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-300",
          isDark ? "opacity-0 scale-75 -rotate-90 pointer-events-none" : "opacity-100 scale-100 rotate-0"
        )}
        aria-hidden
      >
        <MoonIcon />
      </span>
    </button>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {open ? (
        <path d="M4 4l12 12M4 16L16 4" />
      ) : (
        <path d="M2.5 6.5h15M2.5 10h15M2.5 13.5h15" />
      )}
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
      <circle cx="10" cy="10" r="3.5" />
      <path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4.1 4.1l1.42 1.42M14.48 14.48l1.42 1.42M4.1 15.9l1.42-1.42M14.48 5.52l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 11.5A7 7 0 0 1 8.5 3.5 7.5 7.5 0 1 0 16.5 11.5z" />
    </svg>
  );
}
