/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
      },
      colors: {
        text: {
          50: "#f7eded",
          100: "#f0dbdb",
          200: "#e0b8b8",
          300: "#d19494",
          400: "#c27070",
          500: "#b34d4d",
          600: "#8f3d3d",
          700: "#6b2e2e",
          800: "#471f1f",
          900: "#240f0f",
          950: "#120808",
        },
        background: {
          50: "#f2f2f2",
          100: "#e6e6e6",
          200: "#cccccc",
          300: "#b3b3b3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4d4d4d",
          800: "#333333",
          900: "#1a1a1a",
          950: "#0d0d0d",
        },
        primary: {
          50: "#e9f3fc",
          100: "#d2e6f9",
          200: "#a5cdf3",
          300: "#78b4ed",
          400: "#4b9ce7",
          500: "#1f83e0",
          600: "#1869b4",
          700: "#124e87",
          800: "#0c345a",
          900: "#061a2d",
          950: "#030d16",
        },
        secondary: {
          50: "#e6feea",
          100: "#cdfed5",
          200: "#9cfcac",
          300: "#6afb82",
          400: "#38fa58",
          500: "#06f92f",
          600: "#05c725",
          700: "#04951c",
          800: "#036313",
          900: "#013209",
          950: "#011905",
        },
        action: {
          50: "#fff4e5",
          100: "#ffeacc",
          200: "#ffd599",
          300: "#ffbf66",
          400: "#ffaa33",
          500: "#ff9500",
          600: "#cc7700",
          700: "#995900",
          800: "#663c00",
          900: "#331e00",
          950: "#1a0f00",
        },
      },
    },
  },
  plugins: [],
};