import type { Config } from 'tailwindcss';

import svgToTinyDataUri from 'mini-svg-data-uri';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#9022FF',
          contrastText: '#FFFFFF',
          light: '#2C2135',
          dark: '#A1C4FA',
        },
        secondary: {
          contrastText: '#DCDCDC',
        },
        background: {
          default: '#1A151F',
          paper: '#211928',
        },
      },
      backgroundImage: {
        grid: `url("${svgToTinyDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="#211928"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      },
    },
  },
  prefix: 'tw-',
  plugins: [],
  important: true,
};
export default config;
