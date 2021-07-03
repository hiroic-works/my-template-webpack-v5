const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// マルチページ対応
function generateHtmlPlugins(templateDir) {
	// テンプレート用ディレクトリの内容取得
	const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));

	return templateFiles.map(item => {

		// ファイル名と拡張子を分割
		const parts = item.split('.');
		const name = parts[0];
		const extension = parts[1];

		// HtmlWebpackPlugin生成
		return new HtmlWebpackPlugin({
			filename: `${name}.html`,
			template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
			inject: 'body',
			chunks: ['app'],
		});
	});
}

// HtmlWebpackPlugin生成
const htmlWebpackPlugins = generateHtmlPlugins('./src/views');

module.exports = ({ outputName, assetName }) => ({
	// エントリーポイント
	entry: { app: './src/assets/js/app.js' },

	// ファイル出力設定
	output: {
		//  出力ディレクトリ名
		path: path.resolve(__dirname, 'public'),
		// 出力ファイル名
		filename: `${outputName}.js`,
		chunkFilename: `${outputName}.js`,
	},
	module: {
		rules: [
			{
				// babel
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				// sass
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				]
			},
			{
				// html
				test: /\.html$/,
				use: ['html-loader']
			},
			{
				// image,font
				test: /\.(jpe?g|gif|png|svg|woff2?|ttf|eot)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: `${assetName}.[ext]`,
						outputPath: 'images',
						publicPath: 'images',
					}
				}
			},
		]
	},
	plugins: [
		// cssファイル生成
		new MiniCssExtractPlugin({
			filename: `${outputName}.css`
		}),
	].concat(htmlWebpackPlugins),
	resolve: {
		alias: {
			'@js': path.resolve(__dirname, 'src/assets/js'),
			'@scss': path.resolve(__dirname, 'src/assets/scss'),
			'@img': path.resolve(__dirname, 'src/assets/images'),
		},
		extensions: ['.js', '.scss'],
		modules: [path.resolve(__dirname, 'src'), 'node_modules'],
	},

});
