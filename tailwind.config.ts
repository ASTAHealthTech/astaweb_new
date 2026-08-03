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
      padding: { DEFAULT: "1.5rem", md: "2rem", lg: "3rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        bg: { DEFAULT: "#F7F6F3", alt: "#EFEEE9" },
        fg: { DEFAULT: "#1A1A1A", muted: "#6B6B6B", subtle: "#A3A3A3" },
        border: { DEFAULT: "#C8C5B7", dark: "#4A4A4A" },
        accent: { DEFAULT: "var(--accent)", light: "var(--accent-light)" },
        night: { DEFAULT: "#0F0F0F", panel: "#1A1A1A", edge: "#383838" },
        frost: { DEFAULT: "#F5F5F5", muted: "rgba(245,245,245,0.6)" },
        brand: {
          50: "var(--accent-light)", 100: "#fce7f3", 200: "#fbcfe8",
          400: "#f472b6", 500: "var(--accent)", 600: "#9d174d",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: { sm: "6px", md: "10px", lg: "14px", xl: "18px", "2xl": "24px" },
      boxShadow: {
        xs: "0 1px 2px rgba(0,0,0,0.04)",
        sm: "0 1px 3px rgba(0,0,0,0.06)",
        md: "0 4px 12px -2px rgba(0,0,0,0.08)",
      },
      animation: {
        "ticker": "ticker 45s linear infinite",
      },
      keyframes: {
        ticker: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
