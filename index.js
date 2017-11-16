const blockLoader = require('block-loader')
const { getOptions } = require('loader-utils')
const escapeHtml = require('escape-html')

function getDelimiters (tag) {
  const strippedTag = tag
    .replace('<', '')
    .replace('>', '')
    .replace('/', '')
  return {
    start: `<${ strippedTag }>`,
    end: `</${ strippedTag }>`,
  }
}

function getMiddleText (str, start='', end='') {
  const re = new RegExp(`${ start }(.*)${ end }`)
  return str.match(re)[1]
}

function loaderWithTag (tag='pre') {
  const { start, end } = getDelimiters(tag)
  return blockLoader({
    start,
    end,
    process: str => {
      const middleText = getMiddleText(str, start, end)
      return start +  escapeHtml(middleText) + end
    }
  })
}

function load (data) {
  const options = getOptions(this) || {}
  const loader = loaderWithTag(options.tag)
  return loader(data)
}

module.exports = load
