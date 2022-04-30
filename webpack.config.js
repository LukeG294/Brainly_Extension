const path = require('path');
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const MakeEntries = require("./src/scripts/not_changing_these/makeEntries");

/** @type {webpack.Configuration} */
const config = {
  entry: {
    //constant stuff
    ...MakeEntries("./src/scripts/permissions/setPerms.ts", "content-scripts/js", "permissions"),
    ...MakeEntries("./src/scripts/background/background.ts", "content-scripts/js", "serviceWorker"),
    //brainly resources
    ...MakeEntries("./src/scripts/not_changing_these/styleguide-icons.ts", "content-scripts/js", "icons"),
    ...MakeEntries("./src/scripts/not_changing_these/styleguide.ts", "content-scripts/js", "styleguide"),
    //page-specific scripts
    ...MakeEntries("./src/scripts/webpages/homepage/homepage.ts", "content-scripts/js", "homepage"),
    ...MakeEntries("./src/scripts/webpages/old_profile/*.ts", "content-scripts/js", "old_profile"),
    ...MakeEntries("./src/scripts/webpages/question_page/question_page.ts", "content-scripts/js", "question_page"),
    ...MakeEntries("./src/scripts/webpages/content_page/index.ts", "content-scripts/js", "content_page")

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
