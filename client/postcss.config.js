const tailwindcss = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [tailwindcss("./tailwind.js"), require("autoprefixer")],
};
