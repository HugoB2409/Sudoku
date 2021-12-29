const colors = require('tailwindcss/colors')

module.exports = {
  enabled: true,
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // class, 'media' or boolean
  theme: {
    fontFamily: {
      sans: ['Roboto Mono', 'sans-serif']
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.trueGray,
        indigo: colors.indigo,
        red: colors.rose,
        yellow: colors.amber,
        lime: colors.lime,
      },
      borderWidth: {
        '3':'3px'
      },
      boxShadow: {
        'offset-black': '2px 2px black',
        'sudoku-offset-black': '10px 10px black',
        'test': '10px 0px black'
      },
      keyframes: {
        pulse2: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.8' },
        }
      },
      animation: {
        pulse2: 'pulse2 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  variants: {},
  plugins: [
    require("daisyui")
  ],
};
