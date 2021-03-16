const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

webpack(webpackConfig, (error) => {
  if (error) {
    console.error(error) // eslint-disable-line
    process.exit(1)
  }
})
