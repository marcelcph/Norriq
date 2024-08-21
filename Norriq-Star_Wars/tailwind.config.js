/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "ffe81f",

          secondary: "#dc2626",

          accent: "#2E67F8",

          neutral: "#ffffff",

          "base-100": "#000000",

          info: "#22c55e",

          success: "#00ffff",

          warning: "#ffffff",

          error: "#ffffff",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};
