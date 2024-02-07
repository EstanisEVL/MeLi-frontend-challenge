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
    alias: {
      "@components": path.resolve(__dirname, "client/src/components"),
    },
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
