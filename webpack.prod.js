const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const common = require('./webpack.common.js');

const outputName = '[name]-[chunkhash]';
const assetName = '[name]-[contenthash]';
const htmlMinifyOption = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
};

module.exports = merge(common({ outputName, assetName, htmlMinifyOption }), {
  mode: 'production',
  optimization: {
    // minify
    minimizer: [
      // js
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // conosole.log削除
          },
        },
      }),
      // css
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          // customize plugin options
                          convertShapeToPath: {
                            convertArcs: true,
                          },
                          // disable plugins
                          convertPathData: false,
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
  target: ['web', 'es5'],
});
