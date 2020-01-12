const path = require("path");

// NOTE: The module path will be changed in future release.
const TypedTranslatorWebpackPlugin = require("typed-translator/dist/webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "./dist")
  },
  plugins: [
    new TypedTranslatorWebpackPlugin({
      resourceDir: "./resources",
      outputPath: "./types/typed-translator.d.ts",
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  },
};
