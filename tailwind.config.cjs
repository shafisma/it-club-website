module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // These names create `font-base` and `font-heading` utility classes
        base: ['var(--font-sans)'],
        heading: ['var(--font-sans)'],
      },
      borderRadius: {
        // creates `rounded-base`
        base: 'var(--radius-base)',
      },
      boxShadow: {
        // creates `shadow-shadow`
        shadow: 'var(--shadow-shadow)',
      },
      // You can add more token-based mappings here if needed
    },
  },
  plugins: [],
}
