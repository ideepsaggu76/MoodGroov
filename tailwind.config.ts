import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
      colors: {
        'peach': 'rgb(var(--peach-light) / <alpha-value>)',
        'mint': 'rgb(var(--mint-light) / <alpha-value>)',
        'lavender': 'rgb(var(--lavender-light) / <alpha-value>)',
        'sky': 'rgb(var(--sky-light) / <alpha-value>)',
        'cream': 'rgb(var(--cream-light) / <alpha-value>)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        shimmer: 'shimmer 2.5s infinite',
        wave: 'wave 3s ease-in-out infinite',
        blob: 'blob-move 8s ease-in-out infinite',
        'note-dance': 'note-dance 3s ease-in-out infinite',
        gradient: 'gradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        'blob-move': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
        },
        'note-dance': {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-15px) rotate(5deg)' },
          '50%': { transform: 'translateY(0) rotate(0deg)' },
          '75%': { transform: 'translateY(-5px) rotate(-5deg)' },
          '100%': { transform: 'translateY(0) rotate(0deg)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
      backgroundImage: {
        'gradient-sunrise': 'var(--gradient-sunrise)',
        'gradient-mood': 'var(--gradient-mood)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

export default config 