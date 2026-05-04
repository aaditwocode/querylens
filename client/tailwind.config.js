/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary':    '#09090e',
        'bg-secondary':  '#0f0f18',
        'bg-card':       '#13131f',
        'bg-card-hover': '#1a1a2e',
        'border-dim':    '#1e1e35',
        'border-bright': '#2e2e52',
        accent:          '#00e5ff',
        'accent-dim':    'rgba(0,229,255,0.12)',
        'accent-glow':   'rgba(0,229,255,0.4)',
        warn:            '#ff6b35',
        'warn-dim':      'rgba(255,107,53,0.12)',
        success:         '#00ff9d',
        'success-dim':   'rgba(0,255,157,0.12)',
        'text-primary':  '#e8e8f5',
        'text-secondary':'#8888aa',
        'text-muted':    '#55556a',
      },
      fontFamily: {
        mono:    ['"Space Mono"', 'monospace'],
        display: ['Syne', 'sans-serif'],
      },
      borderRadius: {
        base: '8px',
        lg:   '16px',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
        spin2: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        'fade-up':  'fadeUp 0.5s ease forwards',
        'fade-in':  'fadeIn 0.5s ease forwards',
        'pulse2':   'pulse2 2s ease infinite',
        'scan':     'scan 3s linear infinite',
        'spin2':    'spin2 0.8s linear infinite',
        'spin-slow':'spin2 1s linear infinite',
      },
    },
  },
  plugins: [],
}

