const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const outputName = '[name]';
const assetName = '[name]';
const htmlMinifyOption = false;

module.exports = merge(common({ outputName, assetName, htmlMinifyOption }), {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  target: 'web',
});
