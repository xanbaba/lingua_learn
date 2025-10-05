/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#13a4ec",
                "background-light": "#f6f7f8",
                "background-dark": "#101c22",
            },
            fontFamily: {
                display: ["Lexend", "ui-sans-serif", "system-ui", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                full: "9999px",
            },
        },
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/container-queries')],
};