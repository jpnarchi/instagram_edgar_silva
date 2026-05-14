/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        logo: ['"Grand Hotel"', 'cursive'],
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
      colors: {
        ig: {
          bg: '#fafafa',
          card: '#ffffff',
          border: '#dbdbdb',
          text: '#262626',
          muted: '#737373',
          link: '#00376b',
          blue: '#0095f6',
          blueHover: '#1877f2',
          'dark-bg': '#000000',
          'dark-card': '#000000',
          'dark-border': '#262626',
          'dark-text': '#f5f5f5',
          'dark-muted': '#a8a8a8',
          'dark-secondary': '#262626',
        },
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        heart: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '15%': { transform: 'scale(1.2)', opacity: '1' },
          '30%': { transform: 'scale(0.95)' },
          '45%, 80%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'scale-in': 'scale-in 0.18s ease-out',
        heart: 'heart 1s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
