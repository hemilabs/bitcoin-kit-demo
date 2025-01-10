import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'execute-button': 'linear-gradient(180deg, #FF6C15 0%, #F04D06 100%)',
        'execute-button-disabled':
          'linear-gradient(180deg, rgba(255, 108, 21, 0.4) 0%, rgba(240, 77, 6, 0.4) 100%)',
      },
      colors: {
        orange: {
          970: '#C73807',
          950: '#FF6C15',
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        ibm: ['"IBM Plex Mono"', 'monospace'],
      },
      fontFeatureSettings: {
        'custom-features': "'ss03' on, 'ss04' on",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.font-ss03-ss04': {
          fontFeatureSettings: "'ss03' on, 'ss04' on",
        },
      });
    },
  ],
};
export default config;
