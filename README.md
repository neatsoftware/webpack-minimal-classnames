# Webpack Minimal Classnames

Generates the smallest possible css class names when using css modules with webpack css-loader.  
Recommended to do only doing during production builds as a minification step.

### Example

Input:
```css
.someLongDescriptiveCssClassName { color: red; }
.anotherLongDescriptiveCssClassName { color: green; }
```

Output:
```css
.a { color: red; }
.b { color: green; }
```

### Usage

```js
const generateMinimalClassname = require('webpack-minimal-classnames')

{
  test: /\.css$/,
  loaders: [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        getLocalIdent: generateMinimalClassname
      }
    }
  ]
}
```
