/** @type {import('tailwindcss').Config} */
const konstaConfig = require("konsta/config");

module.exports = konstaConfig({
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./ui/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
});
