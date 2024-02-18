/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      spacing: {
        '2rem': '2rem',
        '5rem': '5rem',
      },
    },
  },
  plugins: [],
}

