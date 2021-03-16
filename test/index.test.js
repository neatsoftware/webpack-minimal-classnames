const assert = require('assert')
const pkg = require('../package')
const output = require('../dist/main')

describe(pkg.name, () => {
  it('genereates unique minimal classnames', () => {
    assert.deepStrictEqual(output.style1.locals, { someClassnameBlah: 'jgM', fooBarBangBoom: 'CzG' })
  })

  it('genereates unique names if original classnames are the same but in different files', () => {
    assert.deepStrictEqual(output.style2.locals, { someClassnameBlah: 'TWm' })
  })

  it('references the same classname when file is imported multiple times', () => {
    assert.deepStrictEqual(output.style1Reimport.locals, output.style1.locals)
  })
})
