/** @type {import('tailwindcss').Config} */

// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ["Fredoka One", "sans-serif"],
        luckiest: ["Luckiest Guy", "cursive"]
      },
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)"
        },
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)"
      },
      boxShadow: {
        neumorphic: "4px 4px 0px rgb(var(--border))",
        "neumorphic-pressed":
          "inset 6px 6px 2px rgb(var(--card-foreground)), inset -1px -1px 2px rgb(var(--card-foreground)) ",
        "neumorphic-choc": "4px 4px 0px rgb(var(--card))",
        "neumorphic-choc-pressed":
          "inset 6px 6px 2px rgb(var(--card)), inset -1px -1px 2px rgb(var(--card))"
      }
    }
  },
  plugins: []
};
