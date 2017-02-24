const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
    path: path.resolve(__dirname, 'docs'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};