/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    screen:{
      sm:'488px',
      md:'768px',
      lg:'976px',
      xl:'1440px'
    },
    extend: {
      colors:{
        initClr:'#168219',
        secClr:'#e9ad07',
        gray:'#767573',
        lightOpac:'#ffffff85',
        darkOpac:'#00000085',
        dangerRed:'#c80303'
        
      },
    },
  },
  plugins: [],
}
