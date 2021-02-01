const debug = process.env.NODE_ENV !== "production";
const webpack = require("webpack");
const path = require("path");
const { web } = require("webpack");

const outputPath = path.resolve(__dirname, "src");

module.exports = {
  context: path.join(__dirname, "src"),
  entry: "./index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    path: outputPath,
    filename: "client.min.js",
  },
  plugins: debug
    ? []
    : [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          mangle: false,
          sourcemap: false,
        }),
      ],
  devServer: {
    contentBase: outputPath,
    open: true,
  },
};
