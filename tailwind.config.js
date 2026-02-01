/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                agro: {
                    green: '#16a34a',
                    dark: '#0f172a',
                    light: '#f8fafc',
                }
            }
        },
    },
    plugins: [],
}