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

module.exports = ({ outputName, assetName, htmlMinifyConfig }) => ({
	// エントリーポイント
	entry: {
		index: './src/assets/js/index.js', // TOPページ
		about: './src/assets/js/about.js', // Aboutページ
	},

	// ファイル出力設定
	output: {
		//  出力ディレクトリ名
		path: path.resolve(__dirname, 'public'),
		// 出力ファイル名
		filename: `js/${outputName}.js`,
		chunkFilename: `js/${outputName}.js`,
		assetModuleFilename: `images/${assetName}.[ext]`, // 画像ファイルの出力先
		clean: true, // build時に出力フォルダの事前クリーンアップ
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
				type: 'asset/resource', // webpack5からAsset Modulesが使えるためfile-loaderがいらなくなった
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: `index.html`,
			template: path.resolve(__dirname, `./src/views/index.html`),
			inject: 'body',
			chunks: ['index'],
			minify: htmlMinifyConfig
		}),
		new HtmlWebpackPlugin({
			filename: `about.html`,
			template: path.resolve(__dirname, `./src/views/about.html`),
			inject: 'body',
			chunks: ['about'],
			minify: htmlMinifyConfig
		}),
		// cssファイル生成
		new MiniCssExtractPlugin({
			filename: `css/${outputName}.css`
		}),
	], //.concat(htmlWebpackPlugins),
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
