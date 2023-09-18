/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors:{
      'main':'#23B5D3',
      'secondary': '#f1f5f9',
      'primary': '#fdfdfd',
      'danger': '#d90429',
      'faint': '#868b85',
      'black': '#000000'
    },
    extend: {},
  },
  plugins: [],
}

