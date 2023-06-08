/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        wageblue: "#1999ff",
        grey: "#f9fafb",
        lightblue: "#75BDE0",
        oceanblue: "#78d1d2",
        weedgreen: "#97dbae",
        darkmode: "#374151",
        darkgray: "#526D82",
        darkblue: "#27374D",
        darkpurp: "#5C469C",
        lightgray: "#172a46",
        darkgreen: "#41a58d",
        darktext: "#ced8f8",
        moredark: "#0a192f",
      },
      fontFamily: {
        warownia: ["WarowniaUltExtObl", "sans-serif"],
        thun: ["Thunder-ExtraBoldLC", "sans-serif"],
        garet: ["Fontspring-DEMO-garet-heavy", "sans-serif"],
      },
      borderRadius: {
        large: "25px",
      },
      scale: {
        101: "1.01",
      },
      keyframes: {
        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideIn: {
          "0%": {
            opacity: "0",
            transform: "translateX(30px)",
          },
          100: {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        slideOut: {
          "0%": {
            opacity: "1",
            transform: "translateX(0)",
          },
          100: {
            opacity: "0",
            transform: "translateX(30px)",
          },
        },
      },
      animation: {
        "slide-up": "slideUp 1s",
        "slide-in": "slideIn 2s ease-in-out",
        "slide-out": "slideOut 2s ease-in-out",
      },
      transitionDuration: {
        2000: "2000ms",
      },
    },
  },
  plugins: [],
};
