var blockLoader = require('block-loader')
var getOptions = require('loader-utils').getOptions
var escapeHtml = require('escape-html')

// Strip tags to inner text and format open/closed.
// This allows tags to defined as '<xmp>' or 'xmp'
function getDelimiters (tag) {
  var strippedTag = tag
    .replace('<', '')
    .replace('>', '')
  return {
    start: '<' + strippedTag + '>',
    end: '</' + strippedTag + '>',
  }
}

// Escape inner text between delimiters
function escapeTextInDelimiters (str, start, end) {
  var middleTextRegex = new RegExp(start + '(.*)' + end)
  var middleText = str.match(middleTextRegex)[1]
  return start + escapeHtml(middleText) + end
}

// Create block loader with given tag delimiter
function loaderWithTag (tag) {
  var delimiters = getDelimiters(tag)
  var start = delimiters.start
  var end = delimiters.end
  return blockLoader({
    start: start,
    end: end,
    process: function (str) {
      return escapeTextInDelimiters(str, start, end) 
    }
  })
}

// Parse options and call block loader
function load (data) {
  var options = getOptions(this) || {}
  var tag = options.tag || 'xmp'
  var loader = loaderWithTag(tag)
  return loader(data)
}

module.exports = load
