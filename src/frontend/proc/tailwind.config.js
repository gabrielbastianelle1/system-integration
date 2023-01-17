/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
        extend: {
            colors: {
                colorButton: 'var(--color-button)',
                userBackground: 'var(--color-background)',
                headerList: 'var(--color-headerlist)'
            }
        }
    },
  plugins: [],
}


