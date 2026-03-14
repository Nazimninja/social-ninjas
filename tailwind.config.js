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
                    dark:    '#07101e',
                    surface: '#0b1422',
                    mid:     '#0f1a28',
                    primary: '#5ba4f5',
                    blue2:   '#2563eb',
                    mint:    '#2fcf8e',
                    gold:    '#e8b86d',
                    violet:  '#9b8ef0',
                    slate:   '#7a9bbf',
                },
                neutral: {
                    400: 'rgba(255,255,255,0.55)',
                    500: 'rgba(255,255,255,0.38)',
                    600: 'rgba(255,255,255,0.22)',
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
