/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-select/dist/index.esm.js',
  ],
  theme: {
    extend: {
      colors: {
        textPrimaryColor: '#4b5563',
        textHeadingColor: '#1f2937',
        primaryColor: '#ef4444',
        secondColor: '#dc2626',
      },
      fontFamily: {
        beVietnam: ['Be Vietnam Pro', 'sans-serif'],
      },
      boxShadow: {
        loginBox: '6px 12px 60px rgba(0,0,0,.2)',
        headerBox: '0 2px 2px -1px rgba(0,0,0,.15)',
        menuBox:
          'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em',
      },
      transformOrigin: {
        subMenu: '95% top',
      },
      gridTemplateRows: {
        maxContent: 'max-content;',
      },
      flexBasis: {
        inherit: 'inherit',
      },
    },
  },
  plugins: [],
}
