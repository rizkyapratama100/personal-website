/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Blueprint palette
        blueprint: {
          darknavy: '#1a3a5c',
          blue:     '#2a5298',
          mid:      '#1e4080',
          light:    '#3a6bc4',
          gridline: 'rgba(255,255,255,0.12)',
        },
        // Sticky note colors
        sticky: {
          pink:   '#ffc8c8',
          yellow: '#fff3a3',
          green:  '#c8f0c8',
          blue:   '#c8e8ff',
        },
        // Manila folder
        manila: {
          base: '#d4a853',
          dark: '#b8923f',
          tab:  '#c49840',
        },
      },
      fontFamily: {
        display:     ['"Bebas Neue"', 'sans-serif'],
        handwritten: ['"Caveat"', 'cursive'],
        body:        ['"Inter"', 'sans-serif'],
        title:       ['"Rajdhani"', 'sans-serif'],
      },
      backgroundImage: {
        'blueprint-grid': `
          repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.08) 0px,
            rgba(255,255,255,0.08) 1px,
            transparent 1px,
            transparent 40px
          ),
          repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.08) 0px,
            rgba(255,255,255,0.08) 1px,
            transparent 1px,
            transparent 40px
          )
        `,
      },
      boxShadow: {
        'sticky': '4px 4px 12px rgba(0,0,0,0.35)',
        'sticky-hover': '6px 6px 18px rgba(0,0,0,0.45)',
        'folder': '8px 8px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
