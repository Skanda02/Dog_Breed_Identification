/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3f2',
          100: '#fee5e2',
          200: '#fecfca',
          300: '#fdaea4',
          400: '#fa7f70',
          500: '#f15a47',
          600: '#de3b28',
          700: '#bb2e1d',
          800: '#9a291c',
          900: '#80281e',
        },
        secondary: {
          50: '#fef9ee',
          100: '#fdf0d7',
          200: '#fadead',
          300: '#f7c679',
          400: '#f4a543',
          500: '#f18b1f',
          600: '#e27014',
          700: '#bb5413',
          800: '#964217',
          900: '#7a3716',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
