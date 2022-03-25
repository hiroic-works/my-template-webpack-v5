const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

// ページ設定
const config = {
  // dev,stage,prodを一括バンドルするかどうか。npm run buildでtrueになる
  isBuildAll: process.env.BUILD_ALL === 'on',
  // JavaScriptエンドポイント
  entries: {
    index: './src/assets/scripts/index.js', // TOPページ
    about: './src/assets/scripts/about.js', // aboutページ
  },
  // htmlファイル生成
  htmlWebpackPlugins(htmlMinifyConfig = {}) {
    return [
      new HtmlWebpackPlugin({
        filename: `index.html`,
        template: path.resolve(__dirname, `./src/index.html`),
        inject: 'body',
        chunks: ['index'],
        minify: htmlMinifyConfig,
      }), // TOPページ
      new HtmlWebpackPlugin({
        filename: `about.html`,
        template: path.resolve(__dirname, `./src/about.html`),
        inject: 'body',
        chunks: ['about'],
        minify: htmlMinifyConfig,
      }), // aboutページ
    ];
  },
};

module.exports = ({ outputName, assetName, htmlMinifyConfig }) => ({
  // エントリーポイント
  entry: config.entries,

  // ファイル出力設定
  output: {
    //  出力ディレクトリ名。一括バンドルの場合、それぞれのNODE_ENVのディレクトリ名ごとに作成される
    path: config.isBuildAll
      ? path.resolve(__dirname, `build/${process.env.NODE_ENV}`)
      : path.resolve(__dirname, 'dist'),
    // 出力ファイル名
    filename: `scripts/${outputName}.js`,
    chunkFilename: `scripts/${outputName}.js`,
    // assetModuleFilename: `${assetName}[ext]`,
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
        ],
      },
      {
        // html
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        // image
        test: /\.(jpe?g|gif|png|svg|ico)$/,
        generator: {
          filename: `images/${assetName}[ext]`,
        }, // 出力名
        type: 'asset/resource',
      },
      {
        // font
        test: /\.(woff2?|ttf|eot)$/,
        generator: {
          filename: `fonts/${assetName}[ext]`,
        }, // 出力名
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    // cssファイル生成
    new MiniCssExtractPlugin({
      filename: `styles/${outputName}.css`,
    }),
    new Dotenv({
      path: `./.env.${process.env.NODE_ENV}`,
    }),
  ].concat(config.htmlWebpackPlugins(htmlMinifyConfig)),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@scripts': path.resolve(__dirname, 'src/assets/scripts'),
      '@styles': path.resolve(__dirname, 'src/assets/styles'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
    },
    extensions: ['.js', '.scss'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
});
