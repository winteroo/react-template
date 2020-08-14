const webpack = require('webpack');
const path = require('path');
const {
  merge
} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const colors = require('colors');
const config = require('../config/dev.env');
const portfinder = require('portfinder');

const serverConfig = {
  port: 8080,
  host: 'localhost'
};

const devWebpackConfig = merge(baseWebpackConfig, {
  devtool: 'source-map',
  plugins: [
    // 全局变量
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(config)
    }),
    new webpack.ProgressPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // // 提取css为单独文件的插件
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
      minify: false,
      template: './public/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, '../static'),
        to: './'
      }]
    }),
    new StylelintPlugin({
      // 正则匹配想要lint监测的文件
      files: ['**/*.s?(a|c)ss', '**/*.less']
    })
  ],
  devServer: {
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: serverConfig.host,
    port: serverConfig.port,
    open: false,
    publicPath: '/',
    quiet: true,
    stats: 'errors-only',
    proxy: {
      '/myBase': {
        target: 'http://192.168.1.38:16677/jcms-law',
        changeOrigin: true,
        pathRewrite: {
          '^/myBase': ''
        }
      }
    }
    // watchOptions: {
    //   poll: true
    // }
  }
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = serverConfig.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      const finalAddress = `http://${serverConfig.host}:${port}`;
      devWebpackConfig.plugins.push(new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`You application is running here ${colors.green(finalAddress)}`],
          notes: [
            `Welcome to my website ${colors.yellow('https://winteroo.github.io/ylblog/')}`,
            `Webpack Tutorial : ${colors.yellow('https://winteroo.github.io/ylblog/docs/webpack/')}`
          ]
        }
      }));

      resolve(devWebpackConfig);
    }
  });
});
