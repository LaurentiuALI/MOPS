/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          main: "#6B390A",
          secondary: "#FBF6F2",
          dark: "#190B01",
          light: "#FCF3E8",
          borderDark: "#9B8571",
          borderLight: "#F4CFA4",
          red: "#CA4545",
          black: "#2B1905",
          white: "#FFF"
        },
      },
    },
  },
  plugins: [],
};
