/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ff204e',
        'bg-1': '#00224d',
        'bg-2': '#082953',
        'bg-3': '#103059',
        'bg-4': '#203E64',
        'bg-5': '#304C6F',
      },
    },
  },
  plugins: [],
}

