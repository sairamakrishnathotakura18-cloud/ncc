/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#051b38',
          DEFAULT: '#082B57',
          light: '#0e3e7c',
        },
        brand: {
          DEFAULT: '#1677FF',
          hover: '#0958d9',
          light: '#EAF4FF',
          border: '#bae0ff',
        },
        page: '#F7FAFC',
        text: {
          primary: '#172033',
          secondary: '#667085',
          muted: '#98A2B3',
        },
        status: {
          success: '#12A150',
          warning: '#F5A623',
          gold: '#D99A00',
          danger: '#E53E3E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        'card-hover': '0 8px 24px -4px rgba(8, 43, 87, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        header: '0 2px 10px rgba(8, 43, 87, 0.06)',
      }
    },
  },
  plugins: [],
}
