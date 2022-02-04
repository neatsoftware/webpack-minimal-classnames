const { createHash } = require('crypto')
const { relative } = require('path')

const CHARACTERS_START = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_'
const CHARACTERS = CHARACTERS_START + '-0123456789'
const CHARS_START_LEN = CHARACTERS_START.length
const CHARS_LEN = CHARACTERS.length

function MinimalClassnameGenerator(opts = {}) {
  const { length = 3, excludePatterns = [] } = opts
  if (length < 1) throw Error('[webpack-minimal-classnames] Option `length` must be >= 1')

  const CACHE_MAP = {}
  const CACHE_VALUES = []
  let currentLength = length
  let maxValsForLength = Math.pow(CHARS_LEN, currentLength)

  function generateAndCheck(key, length) {
    const className = hash(key, length)
    const collision = CACHE_VALUES.includes(className)
    const exclusion = !collision && excludePatterns.length && matchesRegexs(className, excludePatterns)
    if (exclusion) CACHE_VALUES.push(className)
    return [className, collision, exclusion]
  }

  return function (context, _, localName) {
    const filepath = relative(context.rootContext, context.resourcePath)
    const key = filepath + localName
    const cached = CACHE_MAP[key]
    if (cached) return cached

    let [className, collision, exclusion] = generateAndCheck(key, currentLength)
    let retriesForLength = 0

    while (collision || exclusion) {
      // Try generating another hash with an augmented key or increased length
      ;[className, collision, exclusion] = generateAndCheck(key + retriesForLength++, currentLength)
      // If reached max possible values for the current length, make it longer and keep trying
      if (retriesForLength >= maxValsForLength) {
        maxValsForLength = Math.pow(CHARS_LEN, ++currentLength)
        retriesForLength = 0
      }
    }

    CACHE_MAP[key] = className
    CACHE_VALUES.push(className)
    return className
  }
}

function hash(string, length) {
  const buffer = createHash('md5').update(string).digest().slice(0, length)
  let value = ''
  for (let i = 0, len = buffer.length; i < len; i++) {
    let charset, charsetLen
    if (i === 0) {
      charset = CHARACTERS_START
      charsetLen = CHARS_START_LEN
    } else {
      charset = CHARACTERS
      charsetLen = CHARS_LEN
    }
    value += charset[buffer.readUInt8(i) % charsetLen]
  }
  return value
}

function matchesRegexs(input, regexs) {
  for (let i = 0, len = regexs.length; i < len; i++) {
    if (regexs[i].test(input)) return true
  }
  return false
}

module.exports = MinimalClassnameGenerator
