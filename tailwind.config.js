// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
         'orange-500': '#FF5E2E',
      },
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
        jost: ['Jost', 'sans-serif'],
      }
    },
  },
  plugins: [],
};

