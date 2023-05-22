/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
        colors: {
          'wageblue': '#1999ff',
          'grey': '#f9fafb',
          'lightblue': '#75BDE0',
          'oceanblue': '#78d1d2',
          'weedgreen': '#97dbae',
          // 'one': '#ff80b5',
          // 'two': '#9089fc',
        },
        fontFamily: {
          'warownia': ["Warownia Ultra Extended Oblique", 'sans-serif']
        },
    },
  },
  plugins: [],
};
