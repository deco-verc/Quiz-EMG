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
        background: "var(--background)",
        foreground: "var(--foreground)",
        brandGreen: {
          cta: "#10B981",
          hover: "#059669",
        },
        navy: {
          DEFAULT: "#1E40AF",
          light: "#3B82F6",
        },
        black: {
          main: "#111827",
        },
        gray: {
          sec: "#6B7280",
        },
        bg: {
          main: "#F9FAFB",
        },
        yellow: {
          warn: "#FBBF24",
          xp: "#FBBF24", // New
        },
        red: {
          urgency: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      backgroundImage: {
        'gradient-green': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
