import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#00B4FF",
          dark: "#0086CC",
          light: "#33C3FF",
        },
        secondary: {
          DEFAULT: "#FF6B35",
          dark: "#CC5528",
        },
        accent: "#FFD700",
        space: {
          black: "#060810",
          dark: "#0D1117",
          navy: "#0A0F1E",
          mid: "#111827",
          card: "#141C2E",
        },
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
