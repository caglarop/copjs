import colors from 'tailwindcss/colors';
import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      borderRadius: {
        xl: '10px'
      },
      colors: {
        ...colors,
        card: {
          DEFAULT: '#fff',
          dark: '#1D2939'
        },
        primary: {
          DEFAULT: '#016D77',
          50: '#32ECFD',
          100: '#1EEAFD',
          200: '#02DCF0',
          300: '#02B7C8',
          400: '#01929F',
          500: '#016D77',
          600: '#013A3F',
          700: '#000708',
          800: '#000000',
          900: '#000000'
        },
        secondary: {
          DEFAULT: '#C2C8D0'
        },
        gray: {
          DEFAULT: '#667085',
          50: '#CBCFD7',
          100: '#C0C4CE',
          200: '#A9AFBD',
          300: '#929AAB',
          400: '#7A8499',
          500: '#667085',
          600: '#4E5565',
          700: '#353B45',
          800: '#1D2026',
          900: '#050506'
        },
        ebony: {
          DEFAULT: '#101828',
          50: '#4467AB',
          100: '#3F5E9D',
          200: '#334C7F',
          300: '#273B62',
          400: '#1E293B',
          500: '#101828',
          600: '#000000',
          700: '#000000',
          800: '#000000',
          900: '#000000'
        },
        discord: '#5865F2',
        github: {
          DEFAULT: '#333333',
          light: '#fafafa'
        }
      }
    }
  },
  extract: {
    include: ['**/*.{jsx,tsx,css}'],
    exclude: ['node_modules', '.git', '.next']
  }
});
