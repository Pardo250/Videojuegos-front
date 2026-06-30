/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#0a0a0f',
          surface: '#111118',
          raised: '#181822',
        },
        neon: {
          violet: '#7c3aed',
          cyan: '#00d4ff',
          magenta: '#f0abfc',
          green: '#00ff88',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        sans: ['Oxanium', 'sans-serif'],
      },
      boxShadow: {
        'glow-violet': '0 0 8px rgba(124, 58, 237, 0.6), 0 0 24px rgba(124, 58, 237, 0.35)',
        'glow-cyan': '0 0 8px rgba(0, 212, 255, 0.6), 0 0 24px rgba(0, 212, 255, 0.35)',
        'glow-green': '0 0 8px rgba(0, 255, 136, 0.6), 0 0 20px rgba(0, 255, 136, 0.3)',
      },
      backgroundImage: {
        'grid-dots': 'radial-gradient(circle, rgba(124, 58, 237, 0.18) 1px, transparent 1px)',
        'gradient-violet-cyan': 'linear-gradient(135deg, #7c3aed, #00d4ff)',
      },
      backgroundSize: {
        'grid-dots': '28px 28px',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        'border-flow': 'border-flow 3s linear infinite',
        'count-up': 'fade-in 0.4s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.55 },
        },
        'border-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
