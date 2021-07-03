const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const outputName = '[name]';
const assetName = '[name]';
const htmlMinifyOption = false;

module.exports = merge(common({ outputName, assetName, htmlMinifyOption  }), {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		open: true,
		contentBase: './public',
		watchOptions: {
			ignored: /node_modules/
		}
	},
});
