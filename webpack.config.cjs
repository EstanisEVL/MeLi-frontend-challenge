const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",

  entry: {
    index: { import: "./client/src/index.tsx", filename: "index.bundle.js" },
    search: {
      import: "./client/src/search.tsx",
      filename: "pages/search.bundle.js",
    },
    item: {
      import: "./client/src/item.tsx",
      filename: "pages/item.bundle.js",
    },
    styles: {
      import: "./client/src/styles.tsx",
      filename: "styles/styles.bundle.js",
    },
  },

  output: {
    path: path.resolve(__dirname, "dist/client"),
    publicPath: "/",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      ".js": [".js", ".ts", ".tsx"],
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.scss?$/i,
        include: path.resolve(__dirname, "client/src/styles"),
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css",
    }),
  ],
};
