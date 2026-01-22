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
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
        '7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0',
        wide: '0.01em',
        wider: '0.02em',
        widest: '0.05em',
      },
      colors: {
        'zavi': {
          // Official Zavi light mode palette
          'paper': '#f0eff8',          // Primary background
          'surface': '#FFFFFF',         // Cards, elevated surfaces
          'border': '#E1E3E8',          // Dividers, borders
          'charcoal': '#34384c',        // Primary headings and text
          'gray-text': '#21232A',       // Secondary text, labels, hints
          'disabled': '#B5B8BF',        // Disabled/inactive elements
          'blue': '#5381d2',            // Brand color - primary accent
          'gold': '#E6C15A',            // Secondary accent
          'icon-default': '#1A1C20',    // Default icons
          'icon-inactive': '#9A9DA4',   // Inactive icons
          'icon-active': '#5BA4FF',     // Active icons (kept for compatibility)

          // Extended grays for gradients
          gray: {
            50: '#f0eff8',
            100: '#E9EBED',
            200: '#E1E3E8',
            300: '#D0D3D9',
            400: '#B5B8BF',
            500: '#9A9DA4',
            600: '#6B6E75',
            700: '#4A4D53',
            800: '#34384c',
            900: '#21232A',
          }
        },
        // Premium Brand Colors (Modern Blue Palette)
        'brand': {
          'primary': '#2563EB',      // Blue-600 - Main brand color
          'secondary': '#3B82F6',    // Blue-500 - Secondary brand
          'accent': '#0EA5E9',       // Sky-500 - Accents
          'dark': '#0F172A',         // Slate-900 - Dark backgrounds
          'light': '#F8FAFC',        // Slate-50 - Light backgrounds
        },
        // Blue scale for accents (centered around #5381d2)
        'zavi-blue': {
          50: '#EDF3FC',
          100: '#DBE7F9',
          200: '#B7CFF3',
          300: '#93B7ED',
          400: '#5381d2',  // Brand color - primary accent
          500: '#4570BE',
          600: '#395FA8',
          700: '#2D4E92',
          800: '#213D7C',
          900: '#152C66',
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
