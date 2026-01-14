import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'zavi': {
          // Light mode palette - single colors
          'paper': '#F4F5F7',         // Primary background
          'surface': '#FFFFFF',        // Cards, elevated surfaces
          'border': '#E1E3E8',         // Dividers, borders
          'charcoal': '#1A1C20',       // Primary text
          'gray-text': '#6B6E75',      // Secondary text
          'disabled': '#B5B8BF',       // Disabled/inactive elements
          'blue': '#5BA4FF',           // Primary accent shorthand (use blue-400 for scale)
          'gold': '#E6C15A',           // Secondary accent shorthand (use gold-400 for scale)
          'icon-inactive': '#9A9DA4',  // Inactive icons

          // Extended grays for gradients
          gray: {
            50: '#F4F5F7',
            100: '#E9EBED',
            200: '#E1E3E8',
            300: '#D0D3D9',
            400: '#B5B8BF',
            500: '#9A9DA4',
            600: '#6B6E75',
            700: '#4A4D53',
            800: '#2E3035',
            900: '#1A1C20',
          }
        },
        // Blue scale for accents (separate from zavi namespace to avoid conflicts)
        'zavi-blue': {
          50: '#EBF4FF',
          100: '#D6E9FF',
          200: '#ADDAFF',
          300: '#85CAFF',
          400: '#5BA4FF',  // Primary accent
          500: '#3D8FEB',
          600: '#2875D1',
          700: '#1A5BAD',
          800: '#0F4389',
          900: '#072B5C',
        },
        // Gold scale for secondary accent
        'zavi-gold': {
          50: '#FDF8EB',
          100: '#FAF1D6',
          200: '#F4E3AD',
          300: '#EED585',
          400: '#E6C15A',  // Secondary accent
          500: '#D4A940',
          600: '#B48E2D',
          700: '#8F711F',
          800: '#6A5414',
          900: '#45380A',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
