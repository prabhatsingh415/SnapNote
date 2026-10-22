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
        inter: ["Inter"],
        "inter-medium": ["Inter-Medium"],
        "inter-semibold": ["Inter-SemiBold"],
        "inter-bold": ["Inter-Bold"],
      },
      colors: {
        light: {
          bg: "#FAF9F5",
          surface: "#FFFFFF",
          border: "#E9E6DF",

          text: "#1C1917",
          textSecondary: "#615E5B",
          textMuted: "#A39E98",

          brand: "#0F5132",
          brandHover: "#0B4329",
        },

        dark: {
          bg: "#121110",
          surface: "#1E1C1A",
          border: "#2E2B29",

          text: "#EDEDEA",
          textSecondary: "#9C9792",
          textMuted: "#66625E",

          brand: "#1E834F",
          brandHover: "#187244",
        },

        status: {
          available: "#1E834F",
          availableBg: "#123D29",
        },
      },
    },
  },
  plugins: [],
};
