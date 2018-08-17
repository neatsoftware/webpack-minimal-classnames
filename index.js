const Strincrement = require('strincrement')
const ALPHABET_CSS_CLASSNAMES = 'abcefghijklmnopqrstuvwxyzABCEFGHIJKLMNOPQRSTUVWXYZ_' // removed 'd' so 'ad' is never generated and ad-blocked

function CssClassnameGenerator () {
  const classnameMap = {}
  const generateClassname = Strincrement(ALPHABET_CSS_CLASSNAMES)

  return function (context, localIdentName, localName) {
    const key = context.resourcePath + localName
    const existing = classnameMap[key]

    if (existing) return existing

    const classname = generateClassname()
    classnameMap[key] = classname
    return classname
  }
}

module.exports = CssClassnameGenerator()
