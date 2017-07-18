const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  // devtool: 'source-map',
  devtool: 'cheap-module-eval-source-map',
  context: path.join(__dirname, '..', 'src'),
  node: {
    fs: 'empty',
    child_process: 'empty'
  },
  // entry: [
  //   'react-hot-loader/patch',
  //   'webpack-hot-middleware/client?reload=true',
  //   'index.js'
  // ],
  entry: {
    main: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?http://0.0.0.0:3000&path=/__webpack_hmr&timeout=6000&reload=true',
      'index.js'
    ]
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    // filename: 'bundle.js',
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  module: {
    rules: require('./webpack.loaders.js')
  },
  plugins: [
    // new StyleLintPlugin({customSyntax: 'postcss-scss'}),
    new ExtractTextPlugin({filename: 'style.css', disable: true}),
    new webpack.DefinePlugin({
      'environment': '\'development\'',
      NODE_ENV: JSON.stringify('development')
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({template: path.join(__dirname, '..', 'src', 'templates', 'index.tpl.html')})
  ],
  resolve: {
    modules: ['node_modules', 'src'],
    plugins: [
      new DirectoryNamedWebpackPlugin()
    ]
  }
}
