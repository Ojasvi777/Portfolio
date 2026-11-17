import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        studio: {
          bg: "#131314",
          surface: "#1e1f20",
          card: "#282a2c",
          hover: "#333538",
          border: "#3c4043",
          borderSubtle: "#282a2c",
          text: "#e3e3e3",
          textMuted: "#9aa0a6",
          textDim: "#80868b",
          blue: "#8ab4f8",
          blueDim: "rgba(138, 180, 248, 0.12)",
          green: "#81c995",
          greenDim: "rgba(129, 201, 149, 0.12)",
          yellow: "#fdd663",
          yellowDim: "rgba(253, 214, 99, 0.12)",
          red: "#f28b82",
          redDim: "rgba(242, 139, 130, 0.12)",
          purple: "#d7aefb",
          purpleDim: "rgba(215, 174, 251, 0.12)",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
