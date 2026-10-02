/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ["Fredoka", "sans-serif"],
        luckiest: ["Luckiest Guy", "cursive"]
      },
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        outline: "rgb(var(--outline) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        "game-panel": "rgb(var(--game-panel) / <alpha-value>)",
        "game-panel-text": "rgb(var(--game-panel-text) / <alpha-value>)",
        "primary-ink": "rgb(var(--primary-ink) / <alpha-value>)",
        "success-ink": "rgb(var(--success-ink) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "tile-face": "rgb(var(--tile-face) / <alpha-value>)",
        "tile-ink": "rgb(var(--tile-ink) / <alpha-value>)",
        slot: "rgb(var(--slot) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        wrong: "rgb(var(--wrong) / <alpha-value>)",
        "wrong-edge": "rgb(var(--wrong-edge) / <alpha-value>)",
        "success-edge": "rgb(var(--success-edge) / <alpha-value>)",
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
        onboardingEnter: {
          from: { opacity: "0", transform: "translateX(12px)" },
          to: { opacity: "1", transform: "translateX(0)" }
        },
        playfulPop: {
          "0%": { transform: "scale(0.94)" },
          "55%": { transform: "scale(1.06)" },
          "100%": { transform: "scale(1)" }
        },
        wobbleX: {
          "0%, 100%": { transform: "translateX(0)" },
          "15%": { transform: "translateX(-7px)" },
          "30%": { transform: "translateX(7px)" },
          "45%": { transform: "translateX(-5px)" },
          "60%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-2px)" }
        },
        correctPop: {
          "0%, 100%": { transform: "scale(1)" },
          "45%": { transform: "scale(1.14)" },
          "70%": { transform: "scale(0.97)" }
        },
        tilePlace: {
          "0%": { transform: "translateY(4px) scale(0.92)" },
          "100%": { transform: "translateY(0) scale(1)" }
        },
        pop: {
          "0%": {
            transform: "scale(0.8)",
            opacity: "0",
            "text-shadow": "none"
          },
          "40%": {
            transform: "scale(1.2)",
            opacity: "1"
          },
          "60%": {
            transform: "scale(0.95)",
          },
          "100%": {
            transform: "scale(1)",
          }
        }
      },
      animation: {
        "onboarding-enter": "onboardingEnter 200ms ease-out both",
        "playful-pop": "playfulPop 180ms ease-out",
        "wobble-x": "wobbleX 300ms ease-in-out",
        "correct-pop": "correctPop 420ms ease-out both",
        "tile-place": "tilePlace 120ms ease-out both",
        pop: "pop 0.8s ease-out forwards"
      }
    }
  },
  plugins: []
};
