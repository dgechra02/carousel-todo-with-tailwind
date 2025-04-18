/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx,mdx}",
		"./**/@material-tailwind/**/*.{html,js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      zIndex: {
        '60':'60',
        'max':'9999'
      }
    },
  },
  plugins: [],
}

