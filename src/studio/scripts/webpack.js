import * as path from 'path';
import * as webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import { CleanWebpackPlugin as CleanPlugin } from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

import { getBuildInfo } from './get-build-info';
import { StaticRendererPlugin } from './static-renderer-plugin';

const sourcesPath = path.join(process.cwd(), 'src');
const buildPath = path.join(process.cwd(), 'build');

const buildInfo = getBuildInfo();

global.__BUILD_INFO__ = buildInfo;

export default {
  target: 'web',
  devtool: false,
  mode: 'production',

  entry: {
    index: path.join(sourcesPath, 'studio/application/browser'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      'node_modules',
    ],
  },

  output: {
    path: buildPath,
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },

  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 6,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: {
          mangle: true,
          compress: true,
        },
      }),
    ],
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
              target: 'browser',
            },
          },
        },
      },
    ],
  },

  plugins: [
    new CleanPlugin(),
    new StaticRendererPlugin(),
    new webpack.DefinePlugin({
      __BUILD_INFO__: JSON.stringify(buildInfo),
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html)$/,
      deleteOriginalAssets: false,
    }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|html)$/,
      compressionOptions: { level: 11 },
      deleteOriginalAssets: false,
    }),
  ],
};
