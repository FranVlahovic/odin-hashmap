#!/bin/bash

# Exit on errors
set -e

# Initialize npm project
npm init -y

# Install Webpack and related dependencies
npm install -D webpack webpack-cli webpack-dev-server html-webpack-plugin style-loader css-loader html-loader

# Create the source directory and files
mkdir -p src && touch src/index.js src/main.html src/styles.css

# Create the Webpack configuration file
cat <<EOL > webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    watchFiles: ["./src/main.html"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/main.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
EOL

# Run Webpack
npx webpack

# Start the development server
npx webpack serve
