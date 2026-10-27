/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica Now Display", "Helvetica Neue", "Arial", "sans-serif"],
        neulis: ["Neulis Cursive", "cursive"],
        aston: ["Aston Script", "cursive"],
      },
      colors: {
        ink: "#1a1a1a",
        paper: "#eff1ef",
        pink: {
          sticker: "#ffc9f1",
        },
        yellow: {
          sticker: "#ffeaa7",
        },
        blue: {
          sticker: "#0b67c4",
        },
      },
      boxShadow: {
        sticker: "0px 6px 3px 0px rgba(0,0,0,0.25)",
        "sticker-sm": "0px 4px 2px 0px rgba(0,0,0,0.25)",
        card: "0px 4px 30px 0px rgba(0,0,0,0.25)",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.35", transform: "scale(0.85)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        twinkle: "twinkle 3.2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 12s linear infinite",
      },
    },
  },
  plugins: [],
}
