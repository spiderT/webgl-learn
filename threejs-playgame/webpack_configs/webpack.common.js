const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AbsulotePath = require('./absulotePath');

var appConfig = {
  entry: {
    app: ['./src/renderer/index.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[hash:8].css',
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          reuseExistingChunk: true,
        },
      },
    },
  },
  target: 'electron-renderer',
  output: {
    filename: 'scripts/[name].[hash:8].js',
    path: AbsulotePath.build,
  },
  module: {
    rules: [{
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              modules: false
            }], 'stage-2', 'react'
          ]
        },
      },
      {
        test: /.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react'],
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /.(png|svg|jpg|jpeg|gif|glb|gltf)$/,
        loader: 'file-loader',
        options: {
          esModule: false, // 这里设置为false
          name: '[name].[ext]',
          outputPath: 'images/',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '../iconfont/',
          outputPath: 'iconfont/',
        },
      },
      // {
      //   test: /\.json$/,
      //   loader: 'file-loader',
      //   options: {
      //     esModule: false, 
      //     name: '[name].[ext]',
      //     outputPath: 'fonts/',
      //   },
      // }
    ],
  },
};

module.exports = appConfig;