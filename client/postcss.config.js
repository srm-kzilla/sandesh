const tailwindcss = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    tailwindcss,
    require("autoprefixer"),
    process.env.NODE_ENV === "production" &&
      purgecss({
        content: [
          "./src/*.tsx",
          "./src/*.ts",
          "./src/**/*.tsx",
          "./src/**/**/*.tsx",
          "./src/**/**/**/*.tsx",
          "./public/index.html",
        ],
        defaultExtractor: (content) =>
          content.match(/[!A-Za-z0-9-_:/]+/g) || [],
      }),
  ],
};
