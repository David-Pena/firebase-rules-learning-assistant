/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1a1a1a',
        'secondary': '#242424',
        'tertiary': '#2d2d2d',
        'accent': '#646cff',
        'accent-hover': '#535bf2',
        'error': '#e53e3e',
        'success': '#38a169',
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        slideDown: 'slideDown 0.2s ease-out'
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#fff',
            a: {
              color: '#646cff',
              '&:hover': {
                color: '#535bf2',
              },
            },
          },
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}