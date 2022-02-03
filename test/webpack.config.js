const { join } = require('path')
const MinimalClassnameGenerator = require('../')

module.exports = {
  mode: 'development',
  devtool: false,
  entry: join(__dirname, 'test-app/entry.js'),
  output: {
    library: { type: 'commonjs2' }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                getLocalIdent: MinimalClassnameGenerator({ excludePatterns: [/^w/i] })
              }
            }
          }
        ]
      }
    ]
  }
}
