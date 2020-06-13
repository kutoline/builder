const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const pagesPath = path.resolve(__dirname, 'src/pages/')
const pages = fs.readdirSync(pagesPath).filter(file => {
  return file.endsWith('.pug');
})

module.exports = {
  entry: './src/entry.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    ...pages.map(page =>
      new HtmlWebpackPlugin({
        template: `${pagesPath}/${page}`,
        filename: `./${page.replace(/\.pug/,'.html')}`
      })
    )
  ],
}