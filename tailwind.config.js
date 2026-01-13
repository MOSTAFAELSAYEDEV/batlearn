/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Batman color scheme
        primary: '#FFD700', // Batman yellow/gold
        secondary: '#1a1a1a', // Dark gray
        batman: {
          dark: '#000000', // Pure black
          gray: '#1a1a1a', // Dark gray
          'gray-light': '#2d2d2d', // Lighter dark gray
          yellow: '#FFD700', // Batman yellow
          'yellow-dark': '#FFA500', // Darker yellow/orange
        },
        success: '#00ff00', // Green
        warning: '#FFD700', // Yellow
        error: '#ff0000', // Red
      },
      backgroundImage: {
        'batman-gradient': 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
        'batman-shine': 'linear-gradient(180deg, rgba(255,215,0,0.1) 0%, transparent 100%)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
