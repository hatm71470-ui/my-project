import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-cairo)", "Tahoma", "Arial", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#eefbf4",
          100: "#d6f5e2",
          200: "#afe9c9",
          300: "#7bd7ab",
          400: "#45bd88",
          500: "#22a06d",
          600: "#158058",
          700: "#126548",
          800: "#12513c",
          900: "#104333",
          950: "#07271e",
        },
        accent: {
          50: "#fff7ed",
          100: "#ffedd4",
          200: "#ffd8a8",
          300: "#ffbb70",
          400: "#ff9438",
          500: "#fd7412",
          600: "#ee5808",
          700: "#c54009",
          800: "#9c3310",
          900: "#7e2c10",
        },
      },
      boxShadow: {
        soft: "0 2px 20px -4px rgba(16, 67, 51, 0.12)",
        card: "0 4px 24px -6px rgba(16, 67, 51, 0.15)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
