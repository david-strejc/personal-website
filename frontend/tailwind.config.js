/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#06B6D4', // Tyrkysová
        'primary-dark': '#0891B2',
        'primary-light': '#22D3EE',
        'secondary': '#7C3AED', // Fialová
        'secondary-dark': '#6D28D9',
        'secondary-light': '#A78BFA',
        'dark': '#0F172A', // Tmavě modrá (navy)
        'darker': '#0A0F1C',
        'light': '#F8FAFC',
        'glass': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'display': ['Montserrat', 'ui-sans-serif', 'system-ui'],
        'mono': ['Fira Code', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #06B6D4, #7C3AED)',
        'gradient-secondary': 'linear-gradient(135deg, #7C3AED, #06B6D4)',
        'gradient-dark': 'linear-gradient(135deg, #0F172A, #1E293B)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.7)' },
        }
      },
      boxShadow: {
        'glow-primary': '0 0 15px rgba(6, 182, 212, 0.5)',
        'glow-secondary': '0 0 15px rgba(124, 58, 237, 0.5)',
      }
    },
  },
  plugins: [],
};
