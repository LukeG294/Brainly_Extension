const path = require('path');
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const MakeEntries = require("./src/scripts/makeEntries");

/** @type {webpack.Configuration} */
const config = {
  entry: {
    ...MakeEntries("./src/scripts/homepage/homepage.ts", "content-scripts/js", "homepage"),
    ...MakeEntries("./src/scripts/setPerms.ts", "content-scripts/js", "permissions"),
    ...MakeEntries("./src/scripts/background.ts", "content-scripts/js", "serviceWorker"),
    ...MakeEntries("./src/scripts/old_profile/*.ts", "content-scripts/js", "old_profile"),
    ...MakeEntries("./src/scripts/styleguide-icons.ts", "content-scripts/js", "icons"),
    ...MakeEntries("./src/scripts/styleguide.ts", "content-scripts/js", "styleguide"),
    ...MakeEntries("./src/scripts/question_page/question_page.ts", "content-scripts/js", "question_page"),
    ...MakeEntries("./src/scripts/content_page/index.ts", "content-scripts/js", "content_page")

  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/
    }],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
    plugins: [
      new TsconfigPathsPlugin()
    ]
  },
  target: "web",
  devtool: "inline-cheap-source-map"
};

if (process.env.NODE_ENV === "production") {
  config.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({ 
        extractComments: false,
        terserOptions: {
          format: { comments: false }
        }
      })
    ]
  };
}

module.exports = config;
