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
        navy: {
          950: '#060B14',
          900: '#0B1220', // Base deep navy background
          850: '#0F1828',
          800: '#151F30', // Elevated card surface
          700: '#263449', // Subtle 1px border
          600: '#384B66',
          500: '#52698A',
        },
        sky: {
          DEFAULT: '#38BDF8',
          accent: '#38BDF8',
          glow: 'rgba(56, 189, 248, 0.25)',
        },
        violet: {
          DEFAULT: '#A78BFA',
          accent: '#A78BFA',
          glow: 'rgba(167, 139, 250, 0.25)',
        },
        emerald: {
          stat: '#34D399',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'sky-violet-gradient': 'linear-gradient(135deg, #38BDF8 0%, #A78BFA 100%)',
        'glass-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'glow-sky': '0 0 25px -5px rgba(56, 189, 248, 0.3)',
        'glow-violet': '0 0 25px -5px rgba(167, 139, 250, 0.3)',
        'glow-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 35s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
