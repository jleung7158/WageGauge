/** @type {import('tailwindcss').Config} */
module.exports = {
  darkmode: 'class',
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
        colors: {
          'wageblue': '#1999ff',
          'grey': '#f9fafb',
          'lightblue': '#75BDE0',
          'oceanblue': '#78d1d2',
          'weedgreen': '#97dbae',
        },
        fontFamily: {
          'warownia': ["Warownia Ultra Extended Oblique", 'sans-serif']
        },
    },
  },
  plugins: [],
};
