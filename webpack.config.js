const path = require('path');
const webpack = require('webpack');
module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './fairybread.js',
  },
  module: {
  loaders: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
  ]
 },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'fairybread.min.js',
  },
};