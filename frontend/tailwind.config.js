/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5F5AF7",
        secondary: "#DEDDF1",
        error: "#FF2C56",
        divider: "#B5C2D1",
        light: "#FFFFFF",
        "table-line": "#DFDFDF",
      },
      textColor: {
        primary: "#334155",
        secondary: "#94A3B8",
      },
    },
  },
  plugins: [],
};
