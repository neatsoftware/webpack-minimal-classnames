const { join } = require('path')
const { writeFileSync } = require('fs')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

webpack(webpackConfig, () => {
  const output = require('../dist/output.js')
  const classnames = []
  for (const exprt in output) {
    classnames.push(...Object.values(output[exprt].locals))
  }

  writeFileSync(join(__dirname, '../dist/test-output.js'), `module.exports = ${JSON.stringify(classnames)}`)
})
