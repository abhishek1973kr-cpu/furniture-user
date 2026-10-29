import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#1A1A1A",
          950: "#0D0D0D",
          900: "#121212",
          850: "#171717",
          800: "#1A1A1A",
          700: "#242424",
          600: "#333333",
          500: "#555555",
        },
        ivory: {
          DEFAULT: "#F9F8F6",
          50: "#FCFCFB",
          100: "#F9F8F6",
          200: "#F3EFEA",
          300: "#E8E3DA",
          400: "#D6CFC3",
          muted: "#9E9A93",
        },
        gold: {
          DEFAULT: "#C5A880",
          light: "#E3CEB2",
          bright: "#D4B489",
          muted: "#B8986E",
          dark: "#8C6E43",
          subtle: "rgba(197, 168, 128, 0.15)",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Cinzel", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "marquee-fast": "marquee 18s linear infinite",
        "pulse-subtle": "pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        shimmer: "shimmer 2.5s infinite linear",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        luxury: "0 10px 40px -10px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(197, 168, 128, 0.2)",
        goldGlow: "0 0 25px rgba(197, 168, 128, 0.25)",
        goldBorder: "inset 0 0 0 1px rgba(197, 168, 128, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;

