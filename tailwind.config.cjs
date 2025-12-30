/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["ui-monospace", "monospace"],
        space: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        base: "0.625rem",
      },
      colors: {
        border: "var(--color-border)",
        primary: "var(--color-primary)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
