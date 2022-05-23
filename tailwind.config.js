module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        form: "96%",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
