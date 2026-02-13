import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "#07070A",
        panel: "rgba(17, 17, 24, 0.65)",
        purple: "#7B5CFF",
        blue: "#38B6FF",
        pink: "#FF4FD8"
      },
      boxShadow: {
        glow: "0 0 30px rgba(123, 92, 255, 0.35)",
        glowBlue: "0 0 30px rgba(56, 182, 255, 0.3)",
        glowPink: "0 0 24px rgba(255, 79, 216, 0.25)"
      },
      backdropBlur: {
        xl: "20px"
      },
      backgroundImage: {
        neonGrid:
          "radial-gradient(circle at 20% 20%, rgba(123,92,255,0.2), transparent 40%), radial-gradient(circle at 80% 30%, rgba(56,182,255,0.16), transparent 35%), radial-gradient(circle at 50% 85%, rgba(255,79,216,0.14), transparent 40%)"
      }
    }
  },
  plugins: []
};

export default config;
