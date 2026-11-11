import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-2": "var(--paper-2)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        line: "var(--line)",
        accent: {
          DEFAULT: "var(--accent)",
          strong: "var(--accent-strong)",
        },
        "gold-line": "var(--gold-line)",
        "gold-text": "var(--gold-text)",
        "on-ink": "var(--on-ink)",
        "on-ink-muted": "var(--on-ink-muted)",
        whatsapp: "var(--whatsapp)",
        success: "var(--success)",

        // Compatibility aliases mapping to new tokens
        bg: "var(--paper)",
        surface: "var(--paper)",
        "surface-2": "var(--paper-2)",
        muted: "var(--ink-muted)",
        brand: {
          DEFAULT: "var(--accent)",
          dark: "var(--accent-strong)",
        },
        gold: "var(--gold-text)",
      },
      fontFamily: {
        serif: ["var(--font-bodoni)", "serif"],
        sans: ["var(--font-mukta)", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      spacing: {
        18: "4.5rem", // 72px
        28: "7rem",   // 112px
      },
      minHeight: {
        dvh: "100dvh",
      },
      borderRadius: {
        card: "4px",
        input: "4px",
      },
      boxShadow: {
        form: "0 8px 24px -4px rgba(22, 19, 20, 0.08)",
        subtle: "0 2px 8px -1px rgba(22, 19, 20, 0.04)",
        warm: "none",
      },
    },
  },
  plugins: [],
};

export default config;
