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
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            colors: {
                white: '#ffffff',
                black: '#020617',
                neutral: {
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    800: '#1e293b',
                    900: '#0f172a',
                },
                brand: {
                    dark: '#020617',
                    surface: '#0f172a',
                    primary: '#38bdf8', // Sky 400 - Clear and Professional
                    secondary: '#6366f1', // Indigo 500 - Deep Trust
                    accent: '#2dd4bf',   // Teal 400 - Growth
                    lime: '#bef264',     // Lime - Conversion
                    realWhite: '#ffffff',
                    realBlack: '#020617',
                }
            },
            backgroundImage: {
                'gradient-premium': 'linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)',
                'gradient-subtle': 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
            },
            animation: {
                'float': 'float 10s ease-in-out infinite',
                'float-delayed': 'float 10s ease-in-out 5s infinite',
                'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fade-in-up': 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'fade-in': 'fadeIn 0.6s ease-out forwards',
                'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                shake: {
                    '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
                    '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
                    '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
                    '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
                }
            }
        }
    },
    plugins: [],
}
