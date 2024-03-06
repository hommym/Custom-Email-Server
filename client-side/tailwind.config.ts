import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sec: '#5954F7',
        bg: '#F6F7FE',
        "deep-text": '#2d2f7a'
      },
      fontFamily: {
        'nunito': ["'Nunito Sans', sans-serif"]
      }
    },
  },
  plugins: [],
}
export default config
