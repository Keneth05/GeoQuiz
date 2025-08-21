/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        Primary: '#15222F',
        Details: '#FFFFFF',
        Placeholders: '#959090',
        Buttons: '#305BAB',
        CardBackground: '#3E4F66',
        CardInformation: '#D1D5DB',
        OptionsInformation: '#333333',
        AppBackground: '#E5E7EB',
        Correct: '#4bae3b',
        Incorrect: '#f94227'
      },
      fontFamily:{
        'roboto': ['Roboto']

      }
    },
  },
  plugins: [],
}

