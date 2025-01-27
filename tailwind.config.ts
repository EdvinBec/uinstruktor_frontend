/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        noise: "url('../assets/img/noise.png')",
      },
      fontFamily: {
        code: ["Fira Code"],
      },
      backgroundColor: {
        body: "#000",
      },
      colors: {
        blue: "#2B44E7",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "open-dropdown": {
          from: { height: 0 },
          to: { height: "100%" },
        },
        "rotate-card": {
          from: { transform: "rotateY(180deg)" },
          to: { transform: "rotateY(0deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "open-dropdown":
          "open-dropdown 0.2s cubic-bezier(0.33, 0.43, 0.31, 0.44)",
        "rotate-card": "rotate-card 0.8s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
