const blockLoader = require('block-loader')
const { getOptions } = require('loader-utils')

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

function loaderWithTag (tag='pre') {
  const { start, end } = getDelimiters(tag)
  return blockLoader({
    start,
    end,
    process: str => {
      const replaced = str
        .replace(start, '')           // first, remove the start/end delimiters, then:
        .replace(end, '')              //
        .replace(/&/g, '&amp;')       // 1. use html entity equivalent,
        .replace(/</g, '&lt;')        // 2. use html entity equivalent,
        .replace(/>/g, '&gt;')        // 3. use html entity equivalent,
        .replace(/([{}])/g, `{'$1'}`) // 4. JSX-safify curly braces,
        .replace(/\n/g, `{'\\n'}`);   // 5. and preserve line endings, thanks.
      // done! return with the delimiters put back in place
      return start + replaced + end
    }
  })
}

function load (data) {
  const options = getOptions(this) || {}
  const loader = loaderWithTag(options.tag)
  return loader(data)
}

module.exports = load
