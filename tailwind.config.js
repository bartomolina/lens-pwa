/** @type {import('tailwindcss').Config} */
const konstaConfig = require("konsta/config");

module.exports = konstaConfig({
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./ui/**/*.{js,ts,jsx,tsx,mdx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  darkMode: "class",
});
