# xmp-escape-loader

A loader that automatically escapes text within `<xmp>` tags. This allows you to use `<xmp>` tags within React components and have the inner HTML render correctly:

```jsx

function MyXMPComponent () {
  return (
    <div>
      <p> I'm outside the xmp tags! </p>
      <xmp>
        <p> I'm inside the xmp tags! </p>
      </xmp>
    </div>
  )
}

// Will render:
// I'm outside the xmp tags!
// <p> I'm inside the xmp tags! </p>

```

### Usage

To load your code with this loader, simply add it to your existing JS loaders in your webpack config. It's also possible to use a tag other than `<xmp>` by passing in a loader option.

```jsx
// webpack.config.js
    ...
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'xmp-escape-loader',
        ],
      },
      ...
    ],

// with custom delimiter tag
    ...
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          {
            loader: 'xmp-escape-loader',
            options: {
              tag: '<pre>'
            }
          },
        ],
      },
      ...
    ],

// with custom escape function
    ...
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          {
            loader: 'xmp-escape-loader',
            options: {
              escape: string => escapeHtml(string).toLowerCase()
            }
          },
        ],
      },
      ...
    ],
```

### How it works

This loader uses [block-loader](https://www.npmjs.com/package/block-loader) and [escape-html](https://www.npmjs.com/package/escape-html) under the hood to parse and format input text. This package is an abstracted implementation of the use case outlined in the block-loader readme, so lots of credit is due to [pomax](https://www.npmjs.com/~pomax)!



