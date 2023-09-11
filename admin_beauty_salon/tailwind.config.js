/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        bevietnam: ["Be Vietnam Pro", "sans-serif"],
      },
      boxShadow: {
        loginBox: "6px 12px 60px rgba(0,0,0,.2)",
      },
    },
  },
  plugins: [],
};
