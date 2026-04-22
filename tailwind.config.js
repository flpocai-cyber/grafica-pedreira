/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0d0f12',
        navy: '#171a1f',
        petrol: '#23272d',
        cyan: '#d2d6dc',
        magenta: '#d86bb6',
        yellow: '#d7b85a',
        gold: '#8f949b',
        mist: '#f1f3f5',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 60px rgba(4, 16, 26, 0.22)',
        glass: '0 18px 80px rgba(7, 19, 31, 0.28)',
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at top left, rgba(255,255,255,0.12), transparent 36%), radial-gradient(circle at bottom right, rgba(143,148,155,0.14), transparent 24%), linear-gradient(135deg, rgba(10,12,15,0.98), rgba(22,24,28,0.96))',
      },
      animation: {
        shimmer: 'shimmer 8s linear infinite',
        float: 'float 8s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
