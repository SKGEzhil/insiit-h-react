/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {

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

        // 'c1': '#F6FBFD',
        // // 'c2': '#E0F0F9',
        // 'c2': '#EEEEEE',
        // 'c3': '#B1DBEF',
        // 'c4': '#84C5E6',
        // 'c5': '#53AFDC',
        // 'c6': '#1993D0',
        // 'c7': '#0077B2',
        // 'c8': '#006596',
        // 'c9': '#005179',
        // 'c10': '#003C5A',

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
    },
  },
  plugins: [],
}

