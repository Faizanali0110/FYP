/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // force class mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Flowbite plugin if you use Flowbite components
    require('flowbite/plugin')
  ],
};
