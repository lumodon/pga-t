const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

module.exports = (env, argv) => {
  console.log(argv.mode)
  return {
    entry: path.resolve(__dirname, 'src/app.js'),
    optimization: {
      minimize: false,
      minimizer: argv.mode === 'production' ? [
        new UglifyJsPlugin({
          test: /\.js(\?.*)?$/i,
          chunkFilter: (chunk) => chunk.name !== 'vendor',
          cache: true,
        })
      ] : []
    },
    output: {
      filename: 'bundle.js',
      chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    watch: argv.mode === 'development',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      disableHostCheck: true,
      port: 5000,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: 'src/index.html',
        appMountId: 'app',
      }),
    ],
  }
}
