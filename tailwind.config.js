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
                display: ['"Instrument Serif"', 'Georgia', 'serif'],
                mono:    ['"JetBrains Mono"', 'monospace'],
            },
            colors: {
                brand: {
                    dark:    '#08101f',
                    surface: '#0c1424',
                    mid:     '#101828',
                    primary: '#4f9eff',
                    blue2:   '#2563eb',
                    mint:    '#34d399',
                    violet:  '#818cf8',
                    accent:  '#34d399',
                    realWhite: '#ffffff',
                    realBlack: '#020617',
                },
                neutral: {
                    300: '#cbd5e1',
                    400: 'rgba(255,255,255,0.52)',
                    500: 'rgba(255,255,255,0.35)',
                    600: 'rgba(255,255,255,0.22)',
                    800: '#1e293b',
                    900: '#0f172a',
                },
            },
            backgroundImage: {
                'gradient-hero': 'linear-gradient(135deg, #2563eb 0%, #4f9eff 100%)',
                'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
            },
            animation: {
                'float':          'float 8s ease-in-out infinite',
                'float-delayed':  'float 8s ease-in-out 4s infinite',
                'pulse-slow':     'pulse 8s cubic-bezier(0.4,0,0.6,1) infinite',
                'fade-in-up':     'fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
                'fade-in':        'fadeIn 0.5s ease-out forwards',
                'scroll':         'scroll 30s linear infinite',
                'spin-slow':      'spin 20s linear infinite',
            },
            keyframes: {
                float: {
                    '0%,100%': { transform: 'translateY(0)' },
                    '50%':     { transform: 'translateY(-14px)' },
                },
                fadeInUp: {
                    '0%':   { opacity: '0', transform: 'translateY(24px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%':   { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scroll: {
                    '0%':   { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
        },
    },
    plugins: [],
};
