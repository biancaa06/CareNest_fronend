// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//       "./app/**/*.{js,ts,jsx,tsx}",
//       "./pages/**/*.{js,ts,jsx,tsx}",
//       "./components/**/*.{js,ts,jsx,tsx}",
//       "./node_modules/tw-elements-react/dist/js/**/*.js",
  
//       // Or if using `src` directory:
//       "./src/**/*.{js,ts,jsx,tsx}",
//       "./node_modules/tw-elements-react/dist/js/**/*.js"
//   ],
//   theme: {
//       extend: {},
//   },
//   darkMode: "class",
//   plugins: [require("tw-elements-react/dist/plugin.cjs")]
//   }

module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path as necessary
    ],
    theme: {
      extend: {
        colors: {
          'custom-green': '#e6f7e6',
        },
      },
    },
    plugins: [],
  };
  