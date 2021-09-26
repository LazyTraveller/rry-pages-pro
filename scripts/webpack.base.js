// scripts/webpack.base.js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin');
const { separator } = require('./utils/constant')
const { getEntryTemplate } = require('./utils/helper')


// 将packages拆分成为数组 ['editor','home']
const packages = process.env.packages.split(separator)

// 调用getEntryTemplate 获得对应的entry和htmlPlugins
const { entry, htmlPlugins } = getEntryTemplate(packages)


module.exports = {
  // 入口文件，这里之后会着重强调
  // entry: {
  //   main: path.resolve(__dirname, '../src/packages/home/index.tsx'),
  //   editor: path.resolve(__dirname, '../src/packages/editor/index.tsx'),

  // },
  // 动态替换entry
  entry,
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@packages': path.resolve(__dirname, '../src/packages'),
      '@containers': path.resolve(__dirname, '../src/containers'),
    },
    mainFiles: ['index', 'main'],
    extensions: ['.ts', '.tsx', '.scss', 'json', '.js'],
  },
  module: {
    rules: [
      {
        // 同时认识ts jsx js tsx 文件
        test: /\.(t|j)sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              keepQuery: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type:'asset/inline'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    // 生成html名称为index.html
    // 生成使用的模板为public/index.html
    // new htmlWebpackPlugin({
    //   filename: 'home.html',
    //   chunks: ['main'],
    //   template: path.resolve(__dirname, '../public/index.html'),
    // }),
    // new htmlWebpackPlugin({
    //   filename: 'editor.html',
    //   chunks: ['editor'],
    //   template: path.resolve(__dirname, '../public/index.html'),
    // }),

    // 同时动态生成对应的htmlPlugins
    ...htmlPlugins
  ],
};
