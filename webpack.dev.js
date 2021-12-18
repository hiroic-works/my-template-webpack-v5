const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const outputName = '[name]';
const assetName = '[name]';
const htmlMinifyOption = false;

module.exports = merge(common({ outputName, assetName, htmlMinifyOption  }), {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		open: true,
		static: {
			directory: path.join(__dirname, 'public'),
		},
	},
	target: 'web', // live reloadを行う場合に必要
});
