const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const resolve = require('path').resolve;
const devMode = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');


module.exports = env => {
  return {
    entry: './src/app/widgets/widget-' + env.WIDGET_NAME + '/widget.' + env.WIDGET_NAME + '.ts',
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'media',
              },
            },
          ],
        },
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        // Compile CSS files
        {test: /\.css$/, use: ['raw-loader']},
        // Compile SCSS files
        {
          test: /\.scss$/,
          use: ['raw-loader', 'sass-loader']
        },
        {
          test: /\.html/,
          use: 'raw-loader',
        },
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
      // new MiniCssExtractPlugin({
      //   filename: 'style.css',
      // }),
      // new webpack.BannerPlugin({
      //   raw: true,
      // }),
    ],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../dist'),
      library: 'execute',
      libraryTarget: 'jsonp'
    }
  }
};