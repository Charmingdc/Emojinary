/** @type {import('tailwindcss').Config} */
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
          "inset 6px 6px 2px rgb(var(--border)), inset -1px -1px 2px rgb(var(--border))",
        "neumorphic-choc": "4px 4px 0px rgb(var(--card))",
        "neumorphic-choc-pressed":
          "inset 6px 6px 2px rgb(var(--card)), inset -1px -1px 2px rgb(var(--card))"
      },
      keyframes: {
        wobbleX: {
          "0%, 100%": { transform: "translateX(0)" },
          "15%": { transform: "translateX(-4px)" },
          "30%": { transform: "translateX(4px)" },
          "45%": { transform: "translateX(-3px)" },
          "60%": { transform: "translateX(3px)" },
          "75%": { transform: "translateX(-2px)" }
        },
        pop: {
          "0%": {
            transform: "scale(0.8)",
            opacity: "0",
            "text-shadow": "0 0 0 rgba(0,0,0,0)"
          },
          "40%": {
            transform: "scale(1.2)",
            opacity: "1",
            "text-shadow": `
              0 4px 10px rgba(255,255,255,0.8),
              0 8px 20px rgba(255,255,255,0.6),
              0 12px 30px rgba(255,255,255,0.4)
            `
          },
          "60%": {
            transform: "scale(0.95)",
            "text-shadow": `
              0 2px 6px rgba(255,255,255,0.6),
              0 4px 12px rgba(255,255,255,0.4)
            `
          },
          "100%": {
            transform: "scale(1)",
            "text-shadow": "0 1px 4px rgba(255,255,255,0.3)"
          }
        }
      },
      animation: {
        "wobble-x": "wobbleX 0.4s ease-in-out",
        pop: "pop 0.8s ease-out forwards"
      }
    }
  },
  plugins: []
};
