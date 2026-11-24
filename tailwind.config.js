import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
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
        accent: "var(--color-accent)",
        "accent-light": "var(--color-accent-light)",
        "accent-dark": "var(--color-accent-dark)",
        "accent-soft": "var(--color-accent-soft)",
        deep: "var(--color-deep)",
        "deep-light": "var(--color-deep-light)",
        "deep-lighter": "var(--color-deep-lighter)",
        // 기본 쿨 그레이를 크림 톤에 맞는 웜 그레이로 덮어쓴다.
        // hex로 두어야 `gray-900/10` 같은 투명도 표기가 동작한다.
        gray: {
          50: "#faf7f2",
          100: "#f2ece3",
          200: "#e5dccf",
          300: "#d3c6b5",
          400: "#ae9f8c",
          500: "#857767",
          600: "#685c4f",
          700: "#4f453b",
          800: "#3a3129",
          900: "#2a231d",
          950: "#1f1914",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            p: {
              fontSize: "1rem", // text-base
            },
            h3: {
              fontSize: "1.25rem", // text-xl
              fontWeight: "700",
            },
            li: {
              fontSize: "1rem",
              "&::marker": {
                color: "var(--color-text-light)",
              },
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};
