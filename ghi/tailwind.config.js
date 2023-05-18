/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
            colors: {
        'wageblue': '#1999ff',
        'grey': '#f9fafb',
        'lightblue': '#75BDE0'
        // 'one': '#ff80b5',
        // 'two': '#9089fc',
      },
    },
  },
  plugins: [],
};
