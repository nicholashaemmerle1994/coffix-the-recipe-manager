/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#00755E',
          secondary: '#F6F2E8',
          accent: '#E6B31E',
          neutral: '#4A4A4A',
          'base-100': '#FFFFFF',
          info: '#121212',
          success: '#28A745',
          warning: '#121212',
          error: '#e15765',
        },
      },
      {
        dark: {
          primary: '#F2BD10',
          secondary: '#7C7A74',
          accent: '#E6B31E',
          neutral: '#4A4A4A',
          'base-100': '#121212',
          info: '#9b9991',
          success: '#28A745',
          warning: '#121212',
          error: '#e19ea5',
        },
      },
    ],
  },
};
