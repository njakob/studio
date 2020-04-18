import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { getBuildInfo } from './get-build-info';

const sourcesPath = path.join(process.cwd(), 'src');
const buildPath = path.join(process.cwd(), 'build');

export default {
  target: 'web',
  devtool: 'sourcemap',
  mode: 'development',

  devServer: {
    contentBase: buildPath,
    compress: true,
    port: 9000,
  },

  entry: [
    path.join(sourcesPath, 'studio/application/browser'),
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      'node_modules',
    ],
  },

  output: {
    path: buildPath,
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[hash].[ext]',
            limit: 10000,
          },
        },
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            caller: {
              target: 'browser-dev',
            },
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({ title: 'Studio (Dev)' }),
    new webpack.DefinePlugin({
      __BUILD_INFO__: JSON.stringify(getBuildInfo()),
      __ENVIRONMENT__: JSON.stringify('browser-dev'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
