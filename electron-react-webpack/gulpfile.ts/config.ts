import {Configuration, ProgressPlugin} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import tailwindcss from 'tailwindcss';
import webpackMerge from 'webpack-merge';
import Paths from './paths';

const isDev = process.env.APP_ENV === 'dev';

const blacklist = [
  'electron-window-state',
  'express',
  'get-port',
  'socket.io',
  'electron'
];

const common: Configuration = {
  mode: isDev ? 'development' : 'none',
  entry: './',
  output: {
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  plugins: [
    new ProgressPlugin()
  ],
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  externals: (context, request, callback) =>
    blacklist.some(item => item.includes(request)) ?
      callback(null, 'commonjs ' + request) :
      callback(undefined, undefined),
  node: false
};

const main = webpackMerge(common, {
  context: Paths.SRC_MAIN,
  output: {
    path: Paths.DIST_MAIN
  },
  target: 'electron-main'
});

const renderer = webpackMerge(common, {
  context: Paths.SRC_RENDERER,
  output: {
    path: Paths.DIST_RENDERER
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer,
                postcssPresetEnv,
                tailwindcss
              ],
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: isDev ? false : {
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new OptimizeCSSAssetsWebpackPlugin({
      cssProcessorOptions: {
        map: {
          inline: false,
          annotation: true
        }
      }
    })
  ],
  target: 'electron-renderer'
});

export default {main, renderer};
