/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // ✅ Must include src/
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // ✅ Optional but recommended
};
