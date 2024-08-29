/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        white: {
          DEFAULT: '#faf9f6',
          50: '#f6f5f2',
          100: '#f2efea',
          200: '#e3ddd5',
          300: '#e0dac8',
        },
        black: '#0b1215',
        primary: {
          50: '#fff1f1',
          100: '#ffe4e4',
          200: '#fecdcf',
          300: '#fda4a8',
          400: '#fb717b',
          500: '#f53e50',
          600: '#e21c39',
          700: '#c41230',
          800: '#9f122e',
          900: '#88132e',
          950: '#4c0514',
        },
        secondary: {
          50: '#faf7f0',
          100: '#f1e8d4',
          200: '#e3cfa4',
          300: '#d4b475',
          400: '#ca9c55',
          500: '#c08240',
          600: '#a96736',
          700: '#8d4e30',
          800: '#743f2c',
          900: '#603627',
          950: '#361b12',
        },
      },
      fontFamily: {
        body: ['Lora Variable', 'ui-serif'],
        display: ['Zilla Slab', 'ui-serif'],
        mono: ['Iosevka', ...defaultTheme.fontFamily.mono],
      },
      keyframes: {
        'float-down-appear': {
          '0%': { transform: 'translateY(-1rem)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'float-up-disappear': {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': {
            transform: 'translateY(-1rem)',
            opacity: 0,
            display: 'none',
          },
        },
      },
      animation: {
        'text-float-down-appear':
          'float-down-appear 400ms cubic-bezier(0.23, 0.97, 0.44, 1.24)',
        'text-float-up-disappear':
          'float-up-disappear 400ms cubic-bezier(0.23, 0.97, 0.44, 1.24) forwards',
      },
      textUnderlineOffset: {
        6: '6px',
      },
    },
  },
  plugins: [],
}
