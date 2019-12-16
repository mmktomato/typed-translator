const path = require("path");

// TODO: This doesn't show typed-translator's error.
//       Maybe I need to find another plugin or create customized plugin.
const WebpackShellPluginNext = require("webpack-shell-plugin-next");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "./dist")
  },
  plugins: [
    new WebpackShellPluginNext({
      onBuildStart:{
        scripts: ["npm run typed-translator"],
        blocking: true,
        parallel: false
      }
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
