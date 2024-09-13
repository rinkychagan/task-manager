/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        courier: ['"Courier Prime"', "monospace"],
        dohyeon: ['"Do Hyeon"', "sans-serif"],
        gochi: ['"Gochi Hand"', "cursive"],
      },
    },
  },
  plugins: [],
};
