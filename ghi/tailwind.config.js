/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
        colors: {
          'wageblue': '#1999ff',
          'grey': '#f9fafb',
          'lightblue': '#75BDE0',
          'oceanblue': '#78d1d2',
          'weedgreen': '#97dbae',
          'darkmode': '#374151',
          'darkgray': '#526D82',
          'darkblue': '#27374D',
        },
        fontFamily: {
          'warownia': ["Warownia Ultra Extended Oblique", 'sans-serif']
        },
    },
  },
  plugins: [],
};
