const path = require("path");

module.exports = {
  entry: "./client/src/index.tsx",

  output: {
    path: path.resolve(__dirname, "dist/client"),
    filename: "bundle.js",
    publicPath: "/",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
    ],
  },
};
