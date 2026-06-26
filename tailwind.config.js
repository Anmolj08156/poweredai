/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        // Brand system — warm amber / orange
        brand: {
          50: "#fff8ec",
          100: "#ffeccd",
          200: "#fcd497",
          300: "#f9bb60",
          400: "#f5a623", // accent
          500: "#ec8b0d", // primary
          600: "#c66f0a", // hover / deeper
          700: "#9d540c",
          800: "#7e4310",
          900: "#683912",
        },
        indigo: {
          accent: "#d97706", // secondary (warm amber)
        },
        ink: {
          DEFAULT: "#181009", // background (espresso)
          surface: "#1d140c",
          card: "#241910", // cards
          border: "#392a1c",
          muted: "#b7a78f",
          soft: "#897763",
        },
      },
      fontFamily: {
        sans: [
          "Inter var",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "Playfair Display",
          "Georgia",
          "ui-serif",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, #181009 70%), radial-gradient(circle at center, rgba(236,139,13,0.10), transparent 60%)",
        "brand-gradient":
          "linear-gradient(135deg, #ec8b0d 0%, #d97706 50%, #f5a623 100%)",
        "radial-glow":
          "radial-gradient(50% 50% at 50% 50%, rgba(236,139,13,0.38) 0%, rgba(236,139,13,0) 100%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(236,139,13,0.22), 0 8px 40px -12px rgba(236,139,13,0.5)",
        "glow-lg": "0 0 80px -20px rgba(236,139,13,0.6)",
        card: "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 24px 48px -24px rgba(0,0,0,0.8)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-18px) translateX(8px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.6" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(30px,-30px) scale(1.1)" },
          "66%": { transform: "translate(-20px,20px) scale(0.95)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) forwards",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        shimmer: "shimmer 2.5s infinite",
        "pulse-ring": "pulse-ring 3s cubic-bezier(0.4,0,0.2,1) infinite",
        marquee: "marquee 40s linear infinite",
        aurora: "aurora 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
