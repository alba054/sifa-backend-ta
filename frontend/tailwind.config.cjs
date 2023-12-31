/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      light: "#FFFFFF",
      transparent: "transparent",
      white: "#ffffff",
      black: "#000000",
      info: "#EFF6FF",
      error: Array (10).fill ("#FF2C56"),
      "sidebar-background": "#F9FAFB",
      "primary-text": {
        50: "#657387",
        100: "#5b697d",
        200: "#515f73",
        300: "#475569",
        400: "#3d4b5f",
        500: "#334155",
        600: "#29374b",
        700: "#1f2d41",
        800: "#152337",
        900: "#0b192d"
      },
      "secondary-text": {
        50: "#c6d5ea",
        100: "#bccbe0",
        200: "#b2c1d6",
        300: "#a8b7cc",
        400: "#9eadc2",
        500: "#94a3b8",
        600: "#8a99ae",
        700: "#808fa4",
        800: "#76859a",
        900: "#6c7b90"
      },
      primary: {
        DEFAULT: "#5F5AF7",
        50: "#918cff",
        100: "#8782ff",
        200: "#7d78ff",
        300: "#736eff",
        400: "#6964ff",
        500: "#5f5af7",
        600: "#5550ed",
        700: "#4b46e3",
        800: "#413cd9",
        900: "#3732cf"
      },
      error: {
        DEFAULT: "#FF2C56",
        50: "#ff5e88",
        100: "#ff547e",
        200: "#ff4a74",
        300: "#ff406a",
        400: "#ff3660",
        500: "#ff2c56",
        600: "#f5224c",
        700: "#eb1842",
        800: "#e10e38",
        900: "#d7042e"
      },
      background: {
        DEFAULT: "#ffffff",
        50: "#ffffff",
        100: "#ffffff",
        200: "#ffffff",
        300: "#ffffff",
        400: "#ffffff",
        500: "#ffffff",
        600: "#f5f5f5",
        700: "#ebebeb",
        800: "#e1e1e1",
        900: "#d7d7d7"
      },
      divider: {
        DEFAULT: "#B5C2D1",
        50: "#e7f4ff",
        100: "#ddeaf9",
        200: "#d3e0ef",
        300: "#c9d6e5",
        400: "#bfccdb",
        500: "#b5c2d1",
        600: "#abb8c7",
        700: "#a1aebd",
        800: "#97a4b3",
        900: "#8d9aa9"
      },
      secondary: {
        DEFAULT: "#DEDDF1",
        50: "#ffffff",
        100: "#ffffff",
        200: "#fcfbff",
        300: "#f2f1ff",
        400: "#e8e7fb",
        500: "#deddf1",
        600: "#d4d3e7",
        700: "#cac9dd",
        800: "#c0bfd3",
        900: "#b6b5c9"
      }
    },
    fontSize: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 20,
      "2xl": 24
    },
    letterSpacing:{
      "01": "0.001em",
      "1": "0.0015em",
      "2": "0.0025em",
      "4": "0.004em"
    },
    dropShadow:{
      "1": "0px 1px 4px rgba(0, 0, 0, 0.12)"
    },
    extend: {}
  },
  plugins: []
};
