import type { Config } from "tailwindcss";

/**
 * Shortellers — "Local Editorial" design tokens.
 * Colours/radii/shadows are declared as CSS variables in src/app/globals.css.
 * This file only maps them into Tailwind's utility namespace. Components must
 * consume these utilities — never redefine raw values locally.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "paper-warm": "var(--paper-warm)",
        surface: "var(--surface)",
        "surface-sunken": "var(--surface-sunken)",
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--ink-muted)",
        },
        border: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
        },
        brand: {
          DEFAULT: "var(--brand-600)",
          700: "var(--brand-700)",
          600: "var(--brand-600)",
          500: "var(--brand-500)",
          100: "var(--brand-100)",
        },
        verified: {
          DEFAULT: "var(--verified)",
          100: "var(--verified-100)",
        },
        rating: {
          DEFAULT: "var(--rating-text)",
          star: "var(--rating-star)",
        },
        info: {
          DEFAULT: "var(--info)",
          100: "var(--info-100)",
        },
        warning: "var(--warning)",
        destructive: {
          DEFAULT: "var(--destructive)",
          100: "var(--destructive-100)",
        },
      },
      borderColor: {
        DEFAULT: "var(--border)",
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        "elev-1": "var(--elev-1)",
        "elev-2": "var(--elev-2)",
        "elev-3": "var(--elev-3)",
        none: "none",
      },
      fontFamily: {
        sans: "var(--font-inter)",
        display: "var(--font-calistoga)",
        mono: "var(--font-jetbrains)",
      },
      maxWidth: {
        container: "1280px",
        prose: "68ch",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.2, 0, 0, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "reveal-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "toast-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pin-pulse": {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "70%": { transform: "scale(2.2)", opacity: "0" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms cubic-bezier(0.2,0,0,1)",
        "reveal-up": "reveal-up 320ms cubic-bezier(0.2,0,0,1) both",
        "toast-in": "toast-in 200ms cubic-bezier(0.2,0,0,1)",
        "pin-pulse": "pin-pulse 2400ms cubic-bezier(0.2,0,0,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
