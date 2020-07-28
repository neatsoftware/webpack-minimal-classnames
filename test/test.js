/* eslint-disable no-undef */
const assert = require('assert')
const pkg = require('../package')
const output = require('../dist/test-output')

describe(pkg.name, () => {
  it('genereates unique minimal classnames, unique transformed names if original classnames the same in different file, and references the same classname when imported multiple times', () => {
    assert.deepStrictEqual(output, [
      // style1.css
      'jgM',
      'CzG',
      // style2.css (contains same classname, but in different file/module
      'TWm',
      // re-imported style1.css again and classes should be the same
      'jgM',
      'CzG'
    ])
  })
})
