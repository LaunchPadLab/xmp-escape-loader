const xmpEscapeLoader = require('../index')
const escapeHtml = require('escape-html')

test('defaults to xmp tag', () => {
  const input = '<xmp><div> Test </div></xmp>'
  const output = xmpEscapeLoader(input)
  expect(output).toEqual('<xmp>&lt;div&gt; Test &lt;/div&gt;</xmp>')
})

test('can receive custom tag', () => {
  const input = '<pre><div> Test </div></pre>'
  const customLoader = xmpEscapeLoader.bind({ query: { tag: 'pre' } })
  const output = customLoader(input)
  expect(output).toEqual('<pre>&lt;div&gt; Test &lt;/div&gt;</pre>')
})

test('works on multiline inputs', () => {
  const input = '<xmp>\n<div> Test </div>\n</xmp>'
  const output = xmpEscapeLoader(input)
  expect(output).toEqual('<xmp>\n&lt;div&gt; Test &lt;/div&gt;\n</xmp>')
})

test('can receive custom escape', () => {
  const input = '<xmp><div> Test </div></xmp>'
  const escape = (string) => escapeHtml(string).toLowerCase()
  const customLoader = xmpEscapeLoader.bind({ query: { escape } })
  const output = customLoader(input)
  expect(output).toEqual('<xmp>&lt;div&gt; test &lt;/div&gt;</xmp>')
})