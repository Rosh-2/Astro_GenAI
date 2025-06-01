/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0A1128',
        'space-light': '#1C2541',
        'cosmic-purple': '#5D54A4',
        'nebula-pink': '#FF6B8B',
        'star-gold': '#FFD700',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};