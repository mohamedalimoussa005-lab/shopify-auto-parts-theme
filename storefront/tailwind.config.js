/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f3d56',
          600: '#0b2e41',
          700: '#082430'
        },
        accent: '#ff7a00',
        graybg: '#f5f7fa'
      },
      fontFamily: {
        sans: ['Roboto', 'Open Sans', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,0.07)'
      }
    }
  },
  plugins: []
}

