const xmpEscapeLoader = require('../index')

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

test('works on nested tags', () => {
  const input = '<xmp><xmp> Test </xmp></xmp>'
  const output = xmpEscapeLoader(input)
  expect(output).toEqual('<xmp>&lt;xmp&gt; Test </xmp></xmp>')
})
