const { createHash } = require('crypto')
const { relative } = require('path')

const CHARACTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_'
const CHARACTERS_LEN = CHARACTERS.length

function hash(string, length) {
  const buffer = createHash('md5').update(string).digest().slice(0, length)

  let value = ''
  for (let i = 0, len = buffer.length; i < len; i++) {
    value += CHARACTERS[buffer.readUInt8(i) % CHARACTERS_LEN]
  }
  return value
}

function MinimalClassnameGenerator(opts = {}) {
  const CACHE_MAP = {}
  const CACHE_VALUES = []
  const { length = 3 } = opts

  return function (context, _, localName) {
    const filepath = relative(context.rootContext, context.resourcePath)
    const key = filepath + localName
    const cached = CACHE_MAP[key]
    if (cached) return cached

    const baseClassname = hash(key, length)
    let newClassname = baseClassname
    let i = 0
    while (CACHE_VALUES.includes(newClassname)) {
      newClassname = baseClassname + i++
    }
    CACHE_MAP[key] = newClassname
    CACHE_VALUES.push(newClassname)
    return newClassname
  }
}

module.exports = MinimalClassnameGenerator
