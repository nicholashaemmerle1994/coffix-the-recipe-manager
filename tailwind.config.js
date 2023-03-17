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
        mytheme: {
          primary: '#8B5A2B',
          secondary: '#F6F2E8',
          accent: '#E6B31E',
          neutral: '#4A4A4A',
          'base-100': '#FFFFFF',
          info: '#84B3F6',
          success: '#28A745',
          warning: '#FFC107',
          error: '#DC3545',
        },
      },
    ],
  },
};
