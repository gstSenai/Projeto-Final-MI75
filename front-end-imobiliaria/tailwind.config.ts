import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vermelho: "#702632",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        montserrat: ["Montserrat", "latin",],
        inter: ["Inter", "sans-serif"],
      },
      screens: {
        'extra': '1800px',
      },
      padding: {
        "auto": "auto",
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
