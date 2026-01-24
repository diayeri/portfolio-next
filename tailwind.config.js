/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Satoshi", "Pretendard", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      colors: {
        primary: "var(--color-primary)",
        "primary-light": "var(--color-primary-light)",
        "primary-dark": "var(--color-primary-dark)",
        secondary: "var(--color-secondary)",
        "secondary-light": "var(--color-secondary-light)",
        "secondary-dark": "var(--color-secondary-dark)",
        background: "var(--color-background)",
        "background-light": "var(--color-background-light)",
        "background-dark": "var(--color-background-dark)",
        text: "var(--color-text)",
        "text-light": "var(--color-text-light)",
        "text-dark": "var(--color-text-dark)",
        surface: "var(--color-surface)",
        "surface-light": "var(--color-surface-light)",
        "surface-dark": "var(--color-surface-dark)",
      },
    },
  },
  plugins: [],
};
