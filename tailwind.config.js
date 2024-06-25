/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ff7d20',
        // 'primary': '#209bff',
        // 'bg-1': '#00224d',
        // 'bg-2': '#082953',
        // 'bg-3': '#103059',
        // 'bg-4': '#203E64',
        // 'bg-5': '#304C6F',

        'bg-1': '#252525',
        'bg-2': '#2d2d2d',
        'bg-3': '#333333',
        'bg-4': '#3a3a3a',
        'bg-5': '#404040',

        // 'bg-1': '#ffffff',
        // 'bg-2': '#ffffff',
        // 'bg-3': '#ffffff',
        // 'bg-4': '#ffffff',
        // 'bg-5': '#d6d6d6',


      },
    },
  },
  plugins: [],
}

