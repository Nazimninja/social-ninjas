/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
                display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
                mono:    ['"JetBrains Mono"', 'monospace'],
            },
            colors: {
                brand: {
                    dark:       '#ffffff',
                    surface:    '#fafafa',
                    mid:        '#f5f5f5',
                    primary:    '#1F4B99',   /* Ninja Blue — robe/hood */
                    blue2:      '#153880',   /* Deep Blue — hover */
                    blueLight:  '#E8EEF8',   /* Blue tint — bg badges */
                    brown:      '#8B5E3C',   /* Sword handle — warm accent */
                    brownLight: '#F5EDE6',   /* Handle tint — warm bg */
                    steel:      '#9BA8B4',   /* Blade silver — borders */
                    mint:       '#3ba213',
                    gold:       '#e8b86d',
                    violet:     '#9b8ef0',
                    slate:      '#717171',
                },
                neutral: {
                    400: '#717171',
                    500: '#adadad',
                    600: '#c8c8c8',
                },
            },
            animation: {
                'float':         'float 8s ease-in-out infinite',
                'float-delayed': 'float 8s ease-in-out 4s infinite',
                'pulse-slow':    'pulse 8s cubic-bezier(0.4,0,0.6,1) infinite',
                'fade-in-up':    'fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
                'scroll':        'scroll 32s linear infinite',
                'spin-slow':     'spin 22s linear infinite',
            },
            keyframes: {
                float:    { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
                fadeInUp: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
                scroll:   { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
            },
        },
    },
    plugins: [],
};
