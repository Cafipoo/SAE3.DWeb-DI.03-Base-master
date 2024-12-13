/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./blog.html",
    "./index.html",
    "./src/**/*.{inc,html}",
    "./src/**/**/*.{inc,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': 'Helvetica, Arial, sans-serif',
      },
      colors: {
        'blue-color': 'var(--clr-blue)',
        'green-color': 'var(--clr-green)',
      },
    },
  },
  plugins: [],
}

