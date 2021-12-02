module.exports = {
  prefix: 'tw-',
  purge: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      screens: {
        sm: '100%',
        md: '100%',
        lg: '960px',
        xl: '1140px'
      }
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
};