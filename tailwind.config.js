/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
 theme: {
  screens: {
   sm: "650px",
   md: "720px",
   lg: "1280px",
   xl: "1920px",
  },
  extend: {
   colors: {
    back: "#E8EBF080",
    primary: "#E8EBF0",
    secondary: "#D6DCE4",
    border: "#AFB0B5",
    text: "#555F64",
    star: "#F4CA78",
   },
  },
  fontFamily: {
   Roboto: ["Roboto, sans-serif"],
  },
 },
 plugins: [],
};
