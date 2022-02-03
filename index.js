const { createHash } = require('crypto')
const { relative } = require('path')

const CHARACTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-0123456789'
const CHARACTERS_LEN = CHARACTERS.length
const REQUIRED_EXCLUDE_PATTERNS = [/^(\d|-)/] // Class names can't start with a digit or dash

function MinimalClassnameGenerator(opts = {}) {
  const CACHE_MAP = {}
  const CACHE_VALUES = []
  const { length = 3, excludePatterns = [] } = opts
  const excludeRegexs = [...REQUIRED_EXCLUDE_PATTERNS, ...excludePatterns]
  let currentLength = length
  let maxValsForLength = Math.pow(CHARACTERS_LEN, currentLength)

  if (length < 1) throw Error('[webpack-minimal-classnames] Option `length` must be >= 1')

  return function (context, _, localName) {
    const filepath = relative(context.rootContext, context.resourcePath)
    const key = filepath + localName
    const cached = CACHE_MAP[key]
    if (cached) return cached

    let className = hash(key, currentLength)
    let retries = 0

    // If there was already the same class name generated (collision), or it matches an exclude pattern
    while (CACHE_VALUES.includes(className) || matchesRegexs(className, excludeRegexs)) {
      // Try generating another name with an incremented key or length
      className = hash(key + retries++, currentLength)
      // If reached max possible values for the current length, make it longer and keep trying
      if (retries >= maxValsForLength) {
        maxValsForLength = Math.pow(CHARACTERS_LEN, ++currentLength)
        retries = 0
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
    value += CHARACTERS[buffer.readUInt8(i) % CHARACTERS_LEN]
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
