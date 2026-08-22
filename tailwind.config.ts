import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        '6xl': '64rem',
        '7xl': '80rem',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'Sarabun', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        // Brand red ramp (kept under the `red` key so existing
        // `text-red-600` / `bg-red-50` etc. usages repaint for free).
        // 500 = Primary (#B4232C), 600 = Primary Dark (#8F1D25) — the two
        // shades the app actually uses for buttons/links/emphasis.
        red: {
          50: '#fceeef',
          100: '#f7d9db',
          200: '#efb3b7',
          300: '#e58087',
          400: '#d8414b',
          500: '#B4232C',
          600: '#8F1D25',
          700: '#77181f',
          800: '#5d1318',
          900: '#4c1014',
        },
        cream: {
          50: '#FAFAF9',
          100: '#f2f2f0',
          200: '#e8e8e5',
        },
        ink: {
          900: '#18181B',
          700: '#3f3f3f',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.10)',
      },
    },
  },
  plugins: [],
};
export default config;
