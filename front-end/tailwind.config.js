const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        screens: {
            xs: '400px',
            xm: '500px',
            ...defaultTheme.screens,
        },
        extend: {},
    },
    plugins: [require('daisyui')],
};
