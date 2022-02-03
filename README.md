# Webpack Minimal Classnames

Generate small css class names when using css modules with webpack css-loader.  
Recommended to do only doing during production builds as a minification step.  
This differs from simply using css-loader's `[hash:base64:n]` by handling any collisions & allowing to configure excluded names.

### Example

Input:

```css
.someLongDescriptiveCssClassName {
  color: red;
}
.anotherLongDescriptiveCssClassName {
  color: green;
}
```

Output:

```css
.v8S {
  color: red;
}
.dyv {
  color: green;
}
```

### Usage

```js
const MinimalClassnameGenerator = require('webpack-minimal-classnames')
const generateMinimalClassname = MinimalClassnameGenerator()

{
  test: /\.css$/,
  loaders: [
    {
      loader: 'css-loader',
      options: {
        modules: {
          getLocalIdent: generateMinimalClassname
        }
      }
    }
  ]
}
```

### Options

**length** _(number)_ - Length of generated class names  
default: 3  
_If the max number of names is generated for a given length, it will start generating more at an incremented length_

**excludePatterns** _(RegExp[])_ - Array of regex patterns to exclude generating as a class name  
_NOTE: Automatically handles illegal css names_
