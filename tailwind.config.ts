import type { Config } from "tailwindcss";

/**
 * "The Clinical Ledger" token sheet.
 * One accent (ASTA Magenta, sampled from the logo cross), one border color,
 * paper-white ground, one dark instrument-panel palette. No other color
 * utilities are sanctioned — lint greps for raw hex in components.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark brand theme — the ground is deep warm aubergine (the logo's
        // violet taken to near-black); light comes from the brand gradient.
        paper: "#0C0812",
        surface: "#150F1E",
        ink: "#F6F2F8",
        "ink-2": "#ABA1B8",
        "ink-3": "#7C7189",
        hairline: "rgba(246,242,248,0.09)",
        "hairline-strong": "rgba(246,242,248,0.2)",
        well: "#1D1528",

        // The logo trio — amber / magenta / violet
        amber: "#F09030",
        accent: "#DE2588",
        "accent-hover": "#F03A9C",
        "accent-ink": "#FFFFFF",
        violet: "#8A4FE0",

        // deepest bands (former instrument panels — now near-black contrast)
        panel: "#060409",
        "panel-surface": "#100A17",
        "panel-surface-hover": "#170F21",
        "panel-ink": "#F2F1ED",
        "panel-ink-2": "rgba(242,241,237,0.62)",
        "panel-ink-3": "rgba(242,241,237,0.42)",
        "panel-hairline": "rgba(242,241,237,0.12)",
        "panel-hairline-strong": "rgba(242,241,237,0.24)",

        // status — inside simulated dashboards / audit logs ONLY
        ok: "#34D399",
        watch: "#F0B429",
        alarm: "#F0564A",
      },

      backgroundImage: {
        "brand-gradient": "linear-gradient(110deg, #F09030 0%, #DE2588 48%, #8A4FE0 100%)",
        "brand-gradient-soft":
          "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(222,37,136,0.16) 0%, rgba(138,79,224,0.10) 45%, transparent 70%)",
      },

      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui"],
        machine: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },

      fontSize: {
        "display-1": ["clamp(3rem, 7.5vw, 6.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "500" }],
        "display-2": ["clamp(2.25rem, 4.5vw, 3.75rem)", { lineHeight: "1.08", letterSpacing: "-0.025em", fontWeight: "500" }],
        title: ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "500" }],
        "title-sm": ["1.25rem", { lineHeight: "1.35", letterSpacing: "-0.01em", fontWeight: "500" }],
        "body-lg": ["1.125rem", { lineHeight: "1.65" }],
        body: ["1rem", { lineHeight: "1.6" }],
        label: ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }],
        "stat-lg": ["clamp(2.5rem, 4vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "500" }],
        stat: ["1rem", { lineHeight: "1.4", fontWeight: "500" }],
        machine: ["0.75rem", { lineHeight: "1.7" }],
      },

      borderRadius: {
        card: "4px",
        pill: "999px",
      },

      boxShadow: {
        "card-hover": "0 16px 48px rgba(222,37,136,0.10), 0 6px 20px rgba(0,0,0,0.55)",
        "glow-brand": "0 0 44px rgba(222,37,136,0.35), 0 0 110px rgba(138,79,224,0.18)",
      },

      spacing: {
        section: "clamp(5rem, 12vw, 10rem)",
        "section-sm": "clamp(4rem, 8vw, 8rem)",
      },

      maxWidth: {
        measure: "62ch",
        "measure-hero": "14ch",
      },

      transitionTimingFunction: {
        rule: "cubic-bezier(0.22, 1, 0.36, 1)",
      },

      keyframes: {
        "live-ping": {
          "0%": { opacity: "0.8", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(2.5)" },
        },
        "ecg-draw": {
          "0%": { strokeDashoffset: "64" },
          "44%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "gradient-pan": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "live-ping": "live-ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        "ecg-draw": "ecg-draw 5.4s linear infinite",
        marquee: "marquee 42s linear infinite",
        "gradient-pan": "gradient-pan 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
