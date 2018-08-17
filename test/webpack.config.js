const { join } = require('path')
const generateMinimalClassname = require('../')

module.exports = {
  mode: 'development',
  devtool: false,
  entry: join(__dirname, 'test-app/entry.js'),
  output: {
    path: join(__dirname, '../dist'),
    filename: 'output.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              getLocalIdent: generateMinimalClassname
            }
          }
        ]
      }
    ]
  }
}
