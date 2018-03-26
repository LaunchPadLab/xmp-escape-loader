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

// Create block loader with given tag delimiter
function loaderWithTag (tag, escape) {
  var delimiters = getDelimiters(tag)
  var start = delimiters.start
  var end = delimiters.end
  return blockLoader({
    start: start,
    end: end,
    process: function (str) {
      var middleText = str.slice(start.length, end.length * -1)
      return start + escape(middleText) + end
    }
  })
}

// Parse options and call block loader
function load (data) {
  var options = getOptions(this) || {}
  var tag = options.tag || 'xmp'
  var escape = options.escape || escapeHtml
  var loader = loaderWithTag(tag, escape)
  return loader(data)
}

module.exports = load
