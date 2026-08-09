import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F6F1',
        surface: '#FFFFFF',
        graphite: '#171922',
        black: '#080808',
        gold: '#C99A54',
        'gold-soft': '#E6C892',
        silver: '#B8BBC1',
        muted: '#686A71',
        border: '#E8E4DC',
        'dark-surface': '#111216',
        'dark-heading': '#F7F5F0',
        'dark-body': '#A8A8AA',
        'dark-gold': '#D0A05A',
        'dark-silver': '#C4C5C8',
        'dark-border': '#24252A',
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.16em',
      },
    },
  },
  plugins: [],
}

export default config
