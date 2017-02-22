const path = require('path');
const webpack = require('webpack');
module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    app: './demo.js',
  },
  module: {
  loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }
  ]
 },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};