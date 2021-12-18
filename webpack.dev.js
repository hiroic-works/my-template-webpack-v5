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
		// 監視対象ファイル。live reloadを行う場合に必要
		watchFiles: {
			paths: ['./src/**/*.html'],
			// options: {
			// 	ignored: '',
			// },
	    },
		//バンドルされたファイルを出力するかどうか
		//writeToDisk: true
	},
	target: 'web', // live reloadを行う場合に必要
});
