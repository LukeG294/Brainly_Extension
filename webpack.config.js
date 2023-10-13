const path = require('path');
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const MakeEntries = require("./src/scripts/makeEntries");

/** @type {webpack.Configuration} */
const config = {
  entry: {
    //constant stuff
    ...MakeEntries("./src/scripts/shortcuts/Index.ts", "content-scripts/js", "shortcuts"),
    ...MakeEntries("./src/scripts/common/permissions/setPerms.ts", "content-scripts/js", "permissions"),
    ...MakeEntries("./src/background/background.ts", "content-scripts/js", "serviceWorker"),
    //brainly resources
    ...MakeEntries("./src/scripts/styleguide/*.ts", "content-scripts/js", "styleguide"),
    //page-specific scripts
    ...MakeEntries("./src/scripts/views/ModPanel.ts", "content-scripts/js", "panel"),
    ...MakeEntries("./src/scripts/common/Permissions/get_permissions.ts", "content-scripts/js", "get_permissions"),
    ...MakeEntries("./src/scripts/views/homepage/Homepage.ts", "content-scripts/js", "homepage"),
    ...MakeEntries("./src/scripts/views/oldProfile/Index.ts", "content-scripts/js", "old_profile"),
    ...MakeEntries("./src/scripts/views/questionPage/QuestionPage.ts", "content-scripts/js", "question_page"),
    ...MakeEntries("./src/scripts/views/contentPage/Index.ts", "content-scripts/js", "content_page"),
    ...MakeEntries("./src/scripts/views/modAll/Index.ts", "content-scripts/js", "mod_all"),
    ...MakeEntries("./src/scripts/views/newProfile/index.ts", "content-scripts/js", "newProfile"),
    ...MakeEntries("./src/scripts/views/searchPage/searchPage.ts", "content-scripts/js", "search_page"),
    //react
    ...MakeEntries("./src/scripts/views/verificationQueue/Index.ts", "content-scripts/js", "verificationQueue"),
    ...MakeEntries("./src/background/background.ts", "/", "background")

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
    extensions: [".ts", ".js", ".tsx", ".jsx", ""],
    plugins: [
      new TsconfigPathsPlugin()
    ],
    fallback: {
      "fs": false,
      "path": false,
      "os": false,
    }
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
