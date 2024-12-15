/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "textColor-darkMode" : "#f8faff",
        "textColor-lightMode" : "#2d3544",
        "bgColor-darkMode" : "#313338",
        "bgColor-lightMode" : "#eef4ff"
      },
    },
    container:{
      center: true,
      padding:{
        DEFAULT : "10px",
        sm: "20px",
        md: "30px",
        lg: "40px",
        xl: "70px",
        "2xl" : "0px"
      },
    },

    fontFamily:{
      "brandFont" : ["Noto Sans", "sans-serif"],
    },
  },
  plugins: [],
  darkMode: "class",
}