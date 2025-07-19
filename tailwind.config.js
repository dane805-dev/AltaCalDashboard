/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom ranch-themed colors
        ranch: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bce5bc',
          300: '#8dd28d',
          400: '#57b757',
          500: '#359235',
          600: '#2a7a2a',
          700: '#246124',
          800: '#1f4f1f',
          900: '#1c421c',
          950: '#0d250d',
        },
        earth: {
          50: '#faf8f3',
          100: '#f2eee1',
          200: '#e6dcc1',
          300: '#d5c399',
          400: '#c4a56f',
          500: '#b8944f',
          600: '#a77e43',
          700: '#8a6638',
          800: '#715334',
          900: '#5c442c',
          950: '#322317',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}