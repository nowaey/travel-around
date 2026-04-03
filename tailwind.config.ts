import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: "#f0fdfa", 100: "#ccfbf1", 200: "#99f6e4",
          400: "#2dd4bf", 600: "#0d9488", 700: "#0f766e",
          800: "#115e59", 900: "#134e4a",
        },
        stone: {
          50: "#fafaf9", 100: "#f5f5f4", 200: "#e7e5e4",
          300: "#d6d3d1", 400: "#a8a29e", 500: "#78716c",
          600: "#57534e", 700: "#44403c", 800: "#292524", 900: "#1c1917",
        },
        amber: {
          50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a",
          300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b",
          600: "#d97706", 700: "#b45309",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeIn:  { "0%": { opacity: "0", transform: "translateY(10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeInSlow: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
      },
      animation: {
        "fade-in":      "fadeIn 0.5s ease-out forwards",
        "slide-up":     "slideUp 0.6s ease-out forwards",
        "fade-in-slow": "fadeInSlow 1s ease-out forwards",
      },
      boxShadow: {
        warm: "0 4px 24px rgba(120, 80, 20, 0.10)",
        "warm-lg": "0 8px 40px rgba(120, 80, 20, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
