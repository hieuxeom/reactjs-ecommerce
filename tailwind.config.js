/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/theme");

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",],
    theme: {

        extend: {
            colors: {
                primary: "#fb2e86",
                secondary: "#7e33e0",
                warning: "#facc15",
                danger: "#ef4444",
                success: "#4ade80",
                purple: "#7e33e0",
                "sub-background": "#f2f0ff",
                "off-purple": "#9f63b5",
                "navy-blue": "#151875",
                "navy-blue-off": "#3f509e",
                "off-blue": "#151875",
                "sky-blue": "#f2f5ff",
                "red": "#fb2448",
                "blue": "#2f1ac4",
                "pantone-purple": "#e0d3f5"
            },
        },
    },
    darkMode: "class",
    plugins: [nextui()],

};
