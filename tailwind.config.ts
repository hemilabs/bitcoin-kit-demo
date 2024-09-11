import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: {
          970: '#C73807',
          950: '#FF6C15',
        },
      },
    },
  },
}
export default config
