const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.config.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const PUBLIC_PATH = './'
// 1.打包完直接可以在浏览器打开index.html，指定的路径‘./’加到静态资源路径前面
// 2.生产环境配置打包后可以在服务器中打开，指定的路径/dist/加到静态资源路径前面
// 3.默认是''，开发环境中使用，默认是当前项目根目录
module.exports = merge.smart(common, {
  mode: 'production',
  output: {
    publicPath: PUBLIC_PATH,
    filename: 'js/[name].[contenthash:8].js', // 输出文件名称（指定名称+目录）
    path: path.resolve(__dirname, 'dist'), // 输出文件目录（将来所有资源输出的公共目录）
    chunkFilename: 'js/[name].[contenthash:8].js' // 非入口 chunk 的名称
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[name].[chunkhash].css',
      ignoreOrder: false
    }),
    new OptimizeCssAssetsWebpackPlugin(), // 压缩 css
    new WorkboxWebpackPlugin.GenerateSW({
      /*
        1.帮助serviceWorker快速启动
        2.删除旧的serviceWorker
        3.生成一个serviceWorker配置文件
      */
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  stats: {
    children: false
  },
  performance: {
    hints: false
  },
  optimization: {
    minimizer: [ // 配置生产环境的压缩方案：js 和 css
      new TerserWebpackPlugin({
        parallel: 4, // 开启4个进程
        cache: true, // 开启缓存
        terserOptions: {
          output: {
            comments: false
          }
        },
        extractComments: false,
        sourceMap: true // 启动 source-map
      })
    ]
  }
})
