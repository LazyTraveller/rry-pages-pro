// 这里我使用了默认的`webpack`production下的配置
// 如果你需要额外的配置，可以额外添加配置。
// 这里提供动态多页应用的流程 具体压缩/优化插件和配置 各位小哥可以去官网查看配置～
// 之后我也会在文章开头的github仓库中提供不同branch去实践最佳js代码压缩优化
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ]
}

module.exports = merge(prodConfig, baseConfig)
