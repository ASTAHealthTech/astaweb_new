import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", md: "2.5rem", lg: "3.5rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        canvas: "#F4F7FF",
        surface: "#FFFFFF",
        mist: "#EDF2FF",

        night: {
          deep: "#060816",
          mid: "#080E1E",
          edge: "#0D1425",
          panel: "#101728",
        },

        ink: {
          DEFAULT: "#0A1628",
          muted: "#4E6080",
          subtle: "#7A92B0",
        },
        frost: {
          DEFAULT: "#F0F4FF",
          muted: "rgba(240,244,255,0.62)",
          subtle: "rgba(240,244,255,0.35)",
          faint: "rgba(240,244,255,0.18)",
        },

        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#4F6BFF",
          600: "#3D54E8",
          700: "#2D3FD4",
          800: "#1E2EB0",
          900: "#111E8A",
        },

        violet: {
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#7C5CFF",
          600: "#6D3AE8",
        },
        cyan: {
          200: "#A5F3FC",
          300: "#67E8F9",
          400: "#49C6FF",
          500: "#06B6D4",
        },
        teal: {
          300: "#5EEAD4",
          400: "#28D7B5",
          500: "#14B8A6",
        },

        success: "#12B981",
        warning: "#F59E0B",
        critical: "#EF4444",

        line: {
          DEFAULT: "#E2E9F8",
          soft: "#EEF3FF",
          dark: "rgba(255,255,255,0.07)",
          "dark-md": "rgba(255,255,255,0.12)",
          "dark-lg": "rgba(255,255,255,0.18)",
        },
      },

      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },

      fontSize: {
        eyebrow: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.16em", fontWeight: "600" }],
        label: ["0.8125rem", { lineHeight: "1.25rem", fontWeight: "500" }],
        body: ["0.9375rem", { lineHeight: "1.7rem" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.8rem" }],
        h4: ["1.125rem", { lineHeight: "1.5rem", fontWeight: "600", letterSpacing: "-0.018em" }],
        h3: ["1.3125rem", { lineHeight: "1.75rem", fontWeight: "600", letterSpacing: "-0.02em" }],
        h2: ["2rem", { lineHeight: "2.4rem", fontWeight: "600", letterSpacing: "-0.03em" }],
        "h2-lg": ["2.625rem", { lineHeight: "3.1rem", fontWeight: "600", letterSpacing: "-0.035em" }],
        h1: ["3.25rem", { lineHeight: "3.5rem", fontWeight: "600", letterSpacing: "-0.04em" }],
        display: ["4.25rem", { lineHeight: "4.5rem", fontWeight: "600", letterSpacing: "-0.045em" }],
        "display-xl": ["5.75rem", { lineHeight: "6rem", fontWeight: "600", letterSpacing: "-0.05em" }],
      },

      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
        "2xl": "28px",
        "3xl": "40px",
      },

      boxShadow: {
        xs: "0 1px 2px rgba(10,22,40,0.04), 0 0 0 1px rgba(10,22,40,0.04)",
        sm: "0 2px 8px rgba(10,22,40,0.06), 0 0 0 1px rgba(10,22,40,0.05)",
        md: "0 8px 28px -6px rgba(10,22,40,0.12), 0 0 0 1px rgba(10,22,40,0.06)",
        lg: "0 24px 56px -16px rgba(10,22,40,0.20)",
        xl: "0 40px 80px -24px rgba(10,22,40,0.28)",
        "glass-sm": "0 4px 16px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.2)",
        "glass-md": "0 12px 40px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)",
        "glass-lg": "0 32px 80px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.35)",
        "glow-brand": "0 0 48px rgba(79,107,255,0.4), 0 0 120px rgba(79,107,255,0.18)",
        "glow-violet": "0 0 48px rgba(124,92,255,0.4), 0 0 120px rgba(124,92,255,0.18)",
        "glow-cyan": "0 0 40px rgba(73,198,255,0.35), 0 0 100px rgba(73,198,255,0.14)",
        "glow-teal": "0 0 32px rgba(40,215,181,0.35), 0 0 80px rgba(40,215,181,0.14)",
      },

      backgroundImage: {
        "hero-glow":
          "radial-gradient(ellipse 80% 70% at 20% 30%, rgba(124,92,255,0.20) 0%, rgba(79,107,255,0.14) 35%, transparent 65%), radial-gradient(ellipse 60% 60% at 75% 65%, rgba(73,198,255,0.12) 0%, transparent 60%)",
        "section-glow-violet":
          "radial-gradient(ellipse 60% 60% at 30% 30%, rgba(124,92,255,0.14) 0%, transparent 65%), radial-gradient(ellipse 40% 50% at 80% 70%, rgba(79,107,255,0.10) 0%, transparent 60%)",
        "section-glow-teal":
          "radial-gradient(ellipse 55% 55% at 70% 30%, rgba(73,198,255,0.10) 0%, transparent 60%), radial-gradient(ellipse 45% 45% at 20% 70%, rgba(40,215,181,0.08) 0%, transparent 60%)",
        "cta-glow":
          "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(79,107,255,0.20) 0%, rgba(124,92,255,0.15) 30%, transparent 70%)",
        "grid-fine":
          "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.028) 1px, transparent 1px)",
        "grid-light":
          "linear-gradient(rgba(10,22,40,0.04) 1px, transparent 1px), linear-gradient(to right, rgba(10,22,40,0.04) 1px, transparent 1px)",
        "ai-halo":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,107,255,0.10) 0%, rgba(124,92,255,0.06) 45%, transparent 70%)",
        "brand-gradient":
          "linear-gradient(135deg, #4F6BFF 0%, #7C5CFF 55%, #49C6FF 100%)",
        "electric-gradient":
          "linear-gradient(125deg, #4F6BFF 0%, #7C5CFF 100%)",
        "teal-gradient":
          "linear-gradient(90deg, #28D7B5 0%, #49C6FF 100%)",
        "cap-gradient-1":
          "radial-gradient(ellipse 80% 80% at 100% 0%, rgba(79,107,255,0.15) 0%, transparent 60%)",
        "cap-gradient-2":
          "radial-gradient(ellipse 80% 80% at 0% 100%, rgba(40,215,181,0.12) 0%, transparent 60%)",
        "cap-gradient-3":
          "radial-gradient(ellipse 70% 70% at 50% 0%, rgba(124,92,255,0.12) 0%, transparent 60%)",
      },

      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
        snap: "cubic-bezier(0.4, 0.0, 0.2, 1)",
      },

      animation: {
        "orb-cw": "orb-rotate-cw 32s linear infinite",
        "orb-ccw": "orb-rotate-ccw 22s linear infinite",
        "orb-ccw-slow": "orb-rotate-ccw 48s linear infinite",
        "pulse-ring-1": "pulse-ring 2.5s cubic-bezier(0,0,0.2,1) infinite",
        "pulse-ring-2": "pulse-ring 2.5s cubic-bezier(0,0,0.2,1) 0.85s infinite",
        "sphere-breathe": "sphere-breathe 5s ease-in-out infinite",
        "float-1": "float-gentle 7s ease-in-out infinite",
        "float-2": "float-gentle 7s ease-in-out 1.8s infinite",
        "float-3": "float-gentle-2 9s ease-in-out 0.9s infinite",
        "scan-sweep": "scan-sweep 8s linear infinite",
        "ecg-draw": "ecg-trace 1.4s ease-out forwards",
        "data-pulse": "data-pulse 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
      },

      keyframes: {
        "orb-rotate-cw": { to: { transform: "rotate(360deg)" } },
        "orb-rotate-ccw": { to: { transform: "rotate(-360deg)" } },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        "sphere-breathe": {
          "0%,100%": { transform: "scale(1)", filter: "brightness(1)" },
          "50%": { transform: "scale(1.02)", filter: "brightness(1.06)" },
        },
        "float-gentle": {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "float-gentle-2": {
          "0%,100%": { transform: "translateY(0) translateX(0)" },
          "33%": { transform: "translateY(-7px) translateX(4px)" },
          "66%": { transform: "translateY(4px) translateX(-3px)" },
        },
        "scan-sweep": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "ecg-trace": {
          "0%": { strokeDashoffset: "700", opacity: "0" },
          "5%": { opacity: "1" },
          "100%": { strokeDashoffset: "0", opacity: "1" },
        },
        "data-pulse": {
          "0%,100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.07)" },
        },
        "glow-pulse": {
          "0%,100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: " 200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
