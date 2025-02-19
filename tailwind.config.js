const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './index.html',
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors:{
        'main': '#0aad0a'
      }, 

      container: {
        center: true, // Ensures the container is centered
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

