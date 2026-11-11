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
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        brand: {
          DEFAULT: "var(--brand)",
          dark: "var(--brand-dark)",
        },
        gold: "var(--gold)",
        whatsapp: "var(--whatsapp)",
        success: "var(--success)",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-inter)", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
      },
      minHeight: {
        dvh: "100dvh",
      },
      borderRadius: {
        card: "16px",
      },
      boxShadow: {
        subtle: "0 4px 20px -2px rgba(35, 31, 32, 0.05)",
        warm: "0 8px 30px rgba(138, 35, 70, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
