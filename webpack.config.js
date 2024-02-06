const path = require("path");

module.exports = {
  entry: {
    server: "./server/src/server.tsx",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },

  target: "node",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },

  devtool: "inline-source-map",
};
