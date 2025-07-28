// @type {import('tailwindcss').Config}
export default {
  darkMode: "class",

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#121212",
        "dark-card": "#1E1E1E",
        "light-bg": "#F3F4F6",
        "light-card": "#FFFFFF",
        primary: "#3B82F6",
        secondary: "#10B981",
      },
    },
  },
  plugins: [],
};
