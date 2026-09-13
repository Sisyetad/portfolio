import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B1014",
        surface: "#121820",
        surface2: "#161F29",
        line: "#212A34",
        ink: "#E6ECF1",
        muted: "#8A95A3",
        faint: "#576270",
        signal: "#4FD1C5",
        signalDim: "#2E7A72",
        amber: "#F2B84B",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      maxWidth: {
        content: "72rem",
      },
      backgroundImage: {
        grid: "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
