/** @type {import('tailwindcss').Config} */
module.exports = {
  // include everything, if a class is referenced in dynamic content built on the backend, it will need to be included
  content: ['./src/**/*.js','./src/**/*.mjs','./src/**/*.cjs'],
  theme: {
    colors: {
      'baby-puke': '#e9edc9'
    },
    container: {
      center: true
    },
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [ 'dark' ]
  }
}
