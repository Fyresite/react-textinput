var path = require('path');
var webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === 'development'
});

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'TextInput.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /^(?!.*\.test\.js$).*\.js$/,
        exclude: /(node_modules|bower_components|dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            // babelrc: false,
            presets: ['env']
          }
        }
      },
      {
        test: /.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      }
    ]
  },
  externals: {
    'react': 'commonjs react'
  },
  plugins: [
    extractSass
  ]
};