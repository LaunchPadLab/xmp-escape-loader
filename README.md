# xmp-escape-loader

### Usage

```js
// webpack.config.js
    ...
    rules: [
      {
        test: /\.(js)$/,
        use: [
          'xmp-escape-loader',
        ],
      },
      ...
    ],

// with custom tag:
    ...
    rules: [
      {
        test: /\.(js)$/,
        use: [
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
```