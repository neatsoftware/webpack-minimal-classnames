const assert = require('assert')
const pkg = require('../package')
const output = require('../dist/main')

describe(pkg.name, () => {
  it('genereates unique, legal minimal classnames', () => {
    assert.deepStrictEqual(output.style1.locals, {
      someLongDescriptiveCssClassName: 'v8S',
      anotherLongDescriptiveCssClassName: 'dyv',
      anotherOne: 'ubO',
      test123__: 'udR'
    })
  })

  it('genereates unique names if original classnames are the same but in different files', () => {
    assert.deepStrictEqual(output.style2.locals, { someLongDescriptiveCssClassName: 'A_x' })
  })

  it('references the same classname when file is imported multiple times', () => {
    assert.deepStrictEqual(output.style1Reimport.locals, output.style1.locals)
  })
})
