const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = merge(baseWebpackConfig, {
  output: {
    path: path.join(__dirname, '..', 'dist'),
    // filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[id].[chunkhash:8].js'
  },
  stats: {
    colors: true,
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false
  },
  // devtool: 'source-map',
  devtool: false,
  plugins: [
    // 打包进度插件
    new webpack.ProgressPlugin(),
    // 清除打包文件夹插件
    new CleanWebpackPlugin({
      // 模拟文件的删除即不删除文件
      dry: false
    }),
    // 全局变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': require('../config/prod.env.js').NODE_ENV
    }),
    // 提取css为单独文件的插件
    new MiniCssExtractPlugin({
      // 将css打包到执行文件夹
      filename: 'css/[name].[hash:8].css'
    }),
    // 打包html插件，将动态的js插入HTML中
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // 控制将脚本插入到什么位置
      inject: true,
      // 是否压缩
      minify: true,
      template: './public/index.html'
    }),
    // 开启gzip压缩插件
    new CompressionPlugin({
      threshold: 10240
    }),
    // 复制文件夹插件
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, '../static'),
        to: './'
      }]
    })
  ],
  optimization: {
    // 配置tree shaking
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin()],
    // 分离公共chunk在vendor文件中
    splitChunks: {
      chunks: 'all', // 仅提取按需载入的module
      minSize: 30000, // 提取出的新chunk在两次压缩(打包压缩和服务器压缩)之前要大于30kb
      maxSize: 0, // 提取出的新chunk在两次压缩之前要小于多少kb，默认为0，即不做限制
      minChunks: 1, // 被提取的chunk最少需要被多少chunks共同引入
      maxAsyncRequests: 5, // 最大按需载入chunks提取数
      maxInitialRequests: 3, // 最大初始同步chunks提取数
      automaticNameDelimiter: '-', // 默认的命名规则（使用~进行连接）
      name: true,
      // name: 'vendor.js',
      cacheGroups: { // 缓存组配置，默认有vendors和default
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
});
