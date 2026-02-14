import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          50: '#f0f1f8',
          100: '#d4d7eb',
          200: '#a9afd7',
          300: '#7e87c3',
          400: '#535faf',
          500: '#2d3a8c',
          600: '#232e6f',
          700: '#1a2253',
          800: '#111738',
          900: '#0a0e22',
          950: '#060814',
        },
        gold: {
          50: '#fdf9ef',
          100: '#faf0d0',
          200: '#f4dfa0',
          300: '#edcb6a',
          400: '#e6b83e',
          500: '#d4a024',
          600: '#b8831d',
          700: '#996519',
          800: '#7d5118',
          900: '#674316',
        },
        rose: {
          50: '#fdf2f4',
          100: '#fce7eb',
          200: '#f9d0d9',
          300: '#f4a9ba',
          400: '#ec7a96',
          500: '#df4f74',
          600: '#cb2d5d',
          700: '#ab204c',
          800: '#8f1d44',
          900: '#7a1c3e',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 1.2s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
