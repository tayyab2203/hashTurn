/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#82e8c8',
          light: '#a5f0d8',
          dark: '#5fd4b0',
        },
        secondary: {
          DEFAULT: '#1e3756',
          light: '#2a4a6b',
          dark: '#152a42',
        },
        accent: {
          DEFAULT: '#15cfaa',
          light: '#3de0c0',
          dark: '#0fa085',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Inter',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif',
        ],
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
        '3xl': '6rem',
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        sm: '0 2px 4px rgba(30, 55, 86, 0.08)',
        md: '0 4px 12px rgba(30, 55, 86, 0.12)',
        lg: '0 8px 24px rgba(30, 55, 86, 0.16)',
        xl: '0 16px 48px rgba(30, 55, 86, 0.2)',
        glow: '0 0 20px rgba(21, 207, 170, 0.3)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #82e8c8 0%, #15cfaa 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #1e3756 0%, #2a4a6b 100%)',
        'gradient-hero': 'linear-gradient(135deg, rgba(130, 232, 200, 0.15) 0%, rgba(21, 207, 170, 0.08) 50%, rgba(30, 55, 86, 0.05) 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)',
      },
    },
  },
  plugins: [],
};


