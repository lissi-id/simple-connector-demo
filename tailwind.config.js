/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "public/index.html",
    "views/**/*.ejs",
  ],
  theme: {
    extend: {
      colors: {
        "gray": {
          '100': '#d9dde4',
          '200': '#bfc6d1',
          '300': '#a9b2c1',
          '400': '#8893a9',
          '500': '#778099',
          '600': '#6a718b',
          '700': '#5a5e73',
          '800': '#4b4f5d',
          '900': '#30323b'
        },
        "blue": {
          '100': '#c3d5fa',
          '200': '#9abbf6',
          '300': '#6a98f0',
          '400': '#4774ea',
          '500': '#3256de',
          '600': '#263ebe',
          '700': '#2738a6',
          '800': '#253383',
          '900': '#1b2150'
        },
      },
    },
  },
  plugins: [],
}

