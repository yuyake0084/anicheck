import path from 'path';
import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
// import { InjectManifest } from 'workbox-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv === 'development';
const eslint = false;
const stylelint = false;
const src = path.resolve(process.cwd(), 'src');
const dist = path.resolve(process.cwd(), 'public/assets');

const getPlugins = () => {
  const plugins = [
    new ManifestPlugin({
      fileName: path.resolve(process.cwd(), 'public/webpack-assets.json'),
      filter: file => file.isInitial
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: JSON.stringify(nodeEnv) }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: isDev,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new HardSourceWebpackPlugin()
  ];

  if (isDev) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.IgnorePlugin(/webpack-stats\.json$/),
      // new InjectManifest({
      //   swSrc: `${src}/sw.js`,
      //   swDest: `${dist}/sw.js`
      // })
    );
  } else {
    plugins.push(
      new webpack.HashedModuleIdsPlugin(),
      new CompressionPlugin({
        test: /\.jsx?$|\.html$/,
        threshold: 10240
      }),
      // new InjectManifest({
      //   swSrc: `${src}/sw.js`,
      //   swDest: `${dist}/sw.js`
      // }),
      new BundleAnalyzerPlugin({
        analyzerMode: process.env.NODE_ENV === 'analyze' ? 'server' : 'disabled'
      })
    );
  }

  return plugins;
};

const getEntry = () => {
  const entryPoint = `${src}/client/index.js`;
  let entry = ['webpack-hot-middleware/client?reload=true', entryPoint];

  if (!isDev) entry = [entryPoint];

  return entry;
};

export default {
  mode: isDev ? 'development' : 'production',
  cache: isDev,
  devtool: isDev ? 'eval' : 'hidden-source-map',
  context: path.resolve(process.cwd()),
  entry: getEntry(),
  optimization: {
    splitChunks: {
      chunks: 'async'
    }
  },
  output: {
    path: dist,
    publicPath: '/assets/',
    filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDev ? '[id].chunk.js' : '[id].[chunkhash:8].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint',
        options: { failOnError: eslint }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        options: {
          cacheDirectory: isDev,
          babelrc: false,
          presets: [
            ['@babel/env', { modules: false, useBuiltIns: 'usage' }],
            '@babel/react',
            '@babel/flow'
          ],
          plugins: [
            [
              'styled-components',
              {
                ssr: true,
                displayName: isDev,
                preprocess: false
              }
            ],
            [
              'module-resolver',
              {
                alias: {
                  '@config': './src/config',
                  '@server': './src/server',
                  '@client': './src/client',
                }
              }
            ],
            'react-hot-loader/babel',
            'loadable-components/babel',
            '@babel/plugin-proposal-class-properties',
          ],
        },
      },
    ],
  },
  plugins: getPlugins(),
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  resolve: {
    modules: ['node_modules'],
    descriptionFiles: ['package.json'],
    moduleExtensions: ['-loader'],
    extensions: ['.js', '.json']
  }
};
