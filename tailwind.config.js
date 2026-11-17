/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["BricolageGrotesque_500Medium"],
        "bricolage-medium": ["BricolageGrotesque_500Medium"],
        "bricolage-bold": ["BricolageGrotesque_700Bold"],
        mono: ["DMMono_400Regular"],
      },
      colors: {
        accent: {
          DEFAULT: "#3DDC84",
          ink: "#0F100D",
        },
        light: {
          bg: "#F2EEE6",
          fg: "#16150F",
          muted: "#5F5A50",
          card: "#E3DDD0",
          line: "#CFC8B8",
          sheet: "#FBF8F2",
          body: "#3A372F",
          bar: "#16150F",
          danger: "#A8362A",
          dangerLine: "#E3B5AE",
        },
        dark: {
          bg: "#0F100D",
          fg: "#F1EFE8",
          muted: "#A9AEA1",
          card: "#1F211B",
          line: "#34372E",
          sheet: "#181A15",
          body: "#D6D3C9",
          bar: "#262922",
          danger: "#FF9A8F",
          dangerLine: "#5A3A38",
        },
        tabIdle: "#C9C4B8",
      },
    },
  },
  plugins: [],
};
