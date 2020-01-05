import {Configuration, ProgressPlugin, RuleSetRule} from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import tailwindcss from 'tailwindcss';
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
import merge from 'webpack-merge';
import Paths from './paths';

const isDev = process.env.APP_ENV === 'dev';

function scriptsRule(include: string): RuleSetRule {
  return {
    include,
    test: /\.tsx?$/,
    loader: 'ts-loader'
  };
}

const common: Configuration = {
  mode: isDev ? 'development' : 'production',
  entry: './',
  output: {
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  plugins: [
    new ProgressPlugin()
  ],
  devtool: isDev ? 'eval' : 'source-map',
  node: false
};

const main: Configuration = {
  context: Paths.SRC_MAIN,
  output: {
    path: Paths.DIST_MAIN
  },
  module: {
    rules: [
      scriptsRule(Paths.SRC_MAIN)
    ]
  },
  target: 'electron-main'
};

const renderer: Configuration = {
  context: Paths.SRC_RENDERER,
  output: {
    path: Paths.DIST_RENDERER
  },
  module: {
    rules: [
      scriptsRule(Paths.SRC_RENDERER),
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
                tailwindcss({
                  prefix: '',
                  important: true
                }),
                postcssPresetEnv,
                autoprefixer
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
      }
    ]
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsWebpackPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true
          }
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename: 'index.css'}),
    new HtmlWebpackPlugin({template: 'index.html'})
  ],
  target: 'electron-renderer'
};

export default {
  main: merge(common, main),
  renderer: merge(common, renderer)
};
