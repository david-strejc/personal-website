/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0D47A1', // Moderní modrá
        'secondary': '#D32F2F', // Moderní červená
        'primary-light': '#42A5F5',
        'secondary-light': '#EF5350',
        'dark': '#121212',
        'light': '#F5F5F5',
        'glass': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        'sans': ['Roboto', 'ui-sans-serif', 'system-ui'],
        'display': ['Montserrat', 'ui-sans-serif', 'system-ui'],
        'mono': ['Fira Code', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0D47A1, #D32F2F)',
        'gradient-secondary': 'linear-gradient(135deg, #D32F2F, #0D47A1)',
        'hero-pattern': "url('https://images.unsplash.com/photo-1557683304-673a23048d34')",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
