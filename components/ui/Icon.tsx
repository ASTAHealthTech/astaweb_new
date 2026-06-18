import type { IconName } from "@/lib/types";
import { cn } from "@/lib/cn";

type Props = {
  name: IconName;
  className?: string;
  strokeWidth?: number;
};

/**
 * Lightweight inline icon set. Stroke-based, 1.5px, rounded joins.
 * Keeps bundle tiny and on-brand. Extend as needed.
 */
export function Icon({ name, className, strokeWidth = 1.5 }: Props) {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: cn("h-5 w-5", className),
    "aria-hidden": true,
  };

  switch (name) {
    case "activity":
      return (
        <svg {...common}>
          <path d="M3 12h4l2-7 4 14 2-7h6" />
        </svg>
      );
    case "heart-pulse":
      return (
        <svg {...common}>
          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.64 0L12 5.36l-.78-.78a5.4 5.4 0 1 0-7.64 7.64L12 20.72l8.42-8.5a5.4 5.4 0 0 0 0-7.64Z" />
          <path d="M3.5 12h4l2-3 3 6 2-3h6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9Z" />
          <path d="M10 21a2 2 0 0 0 4 0" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.59 2.5a2 2 0 0 1-.45 2.11L8 9.94a16 16 0 0 0 6.06 6.06l1.61-1.2a2 2 0 0 1 2.11-.45c.8.27 1.64.47 2.5.59A2 2 0 0 1 22 16.92Z" />
        </svg>
      );
    case "message-circle":
      return (
        <svg {...common}>
          <path d="M21 11.5A8.5 8.5 0 0 1 12.5 20a8.4 8.4 0 0 1-3.44-.72L3 21l1.72-6.06A8.4 8.4 0 0 1 4 11.5a8.5 8.5 0 1 1 17 0Z" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20a8 8 0 0 1 16 0" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path d="M4 21V7.5A1.5 1.5 0 0 1 5.5 6H10v15" />
          <path d="M10 21V4.5A1.5 1.5 0 0 1 11.5 3h7A1.5 1.5 0 0 1 20 4.5V21" />
          <path d="M7 10h.01M7 14h.01M13 7h.01M13 11h.01M17 7h.01M17 11h.01M15 21v-4h-2v4" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14.5 14.5 0 0 1 0 18" />
          <path d="M12 3a14.5 14.5 0 0 0 0 18" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4 4" />
        </svg>
      );
    case "chevron-down":
      return (
        <svg {...common}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case "eye":
      return (
        <svg {...common}>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "workflow":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="6" rx="1.5" />
          <rect x="14" y="15" width="7" height="6" rx="1.5" />
          <path d="M6.5 9v3a2 2 0 0 0 2 2H14" />
        </svg>
      );
    case "server":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="7" rx="2" />
          <rect x="3" y="13" width="18" height="7" rx="2" />
          <path d="M7 7.5h.01M7 16.5h.01" />
        </svg>
      );
    case "dashboard":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <path d="M3 9.5h18" />
          <path d="M7 16v-3M12 16v-5M17 16v-2" />
        </svg>
      );
    case "route":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2.25" />
          <circle cx="18" cy="6" r="2.25" />
          <circle cx="12" cy="18" r="2.25" />
          <path d="M8.3 6h4.4a3 3 0 0 1 3 3v0" />
          <path d="M12 15.7V12a3 3 0 0 1 3-3" />
          <path d="M10.4 16 12 12.8 13.6 16" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path d="M7 18h10a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 6.88 9.1 3.75 3.75 0 0 0 7 18Z" />
          <path d="M12 10v7" />
          <path d="m9.5 14 2.5 3 2.5-3" />
        </svg>
      );
    case "cpu":
      return (
        <svg {...common}>
          <rect x="6" y="6" width="12" height="12" rx="2" />
          <rect x="9" y="9" width="6" height="6" rx="1" />
          <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 13 9 5 9-5" />
          <path d="m3 18 9 5 9-5" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="4" y="10" width="16" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 1 1 8 0v3" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4 10-10" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "hospital":
      return (
        <svg {...common}>
          <path d="M3 21V8l9-5 9 5v13" />
          <path d="M9 21v-6h6v6" />
          <path d="M12 8v4M10 10h4" />
        </svg>
      );
    case "stethoscope":
      return (
        <svg {...common}>
          <path d="M6 3v5a4 4 0 0 0 8 0V3" />
          <path d="M10 12v3a5 5 0 0 0 10 0v-2" />
          <circle cx="20" cy="11" r="2" />
        </svg>
      );
    case "camera":
      return (
        <svg {...common}>
          <path d="M4 8h3l2-3h6l2 3h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" />
          <circle cx="12" cy="14" r="4" />
        </svg>
      );
    case "bar-chart":
      return (
        <svg {...common}>
          <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15 9-2 5-5 2 2-5 5-2Z" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
        </svg>
      );
    case "map-pin":
      return (
        <svg {...common}>
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "twitter":
      return (
        <svg {...common}>
          <path d="M4 4l16 16M20 4 4 20" />
        </svg>
      );
    default:
      return null;
  }
}
