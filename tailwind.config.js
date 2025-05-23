/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {

      fontFamily: {
        'roundf': ['Varela Round', 'serif']
      },

      screens: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }

        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }

        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },

      colors: {
        // 'primary': '#0077B2',
        'primary': '#000000',

        // 'b1': '#0077B2',

        'b1': '#F6FBFD',
        'b2': '#E0F0F9',
        'b3': '#B1DBEF',
        'b4': '#84C5E6',
        'b5': '#53AFDC',
        'b6': '#1993D0',
        'b7': '#0077B2',
        'b8': '#006596',
        'b9': '#005179',
        'b10': '#003C5A',

        'bg-1': '#252525',
        'bg-2': '#2d2d2d',
        'bg-3': '#333333',
        'bg-4': '#3a3a3a',
        'bg-5': '#404040',


        'c1': '#FAFAFA',
        'c2': '#EEEEEE',
        'c3': '#D5D5D5',
        'c4': '#D5D5D5',
        'c5': '#A5A5A5',
        'c6': '#8B8B8B',
        'c7': '#717171',
        'c8': '#525252',
        'c9': '#373737',
        'c10': '#000000',


      },
      keyframes: {
        'loading-bar': {
          '0%': { width: '0%' },
          '50%': { width: '70%' },
          '100%': { width: '100%' }
        }
      },
      animation: {
        'loading-bar': 'loading-bar 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}

