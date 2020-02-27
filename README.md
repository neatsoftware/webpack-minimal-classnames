# Webpack Minimal Classnames

Generate small css class names when using css modules with webpack css-loader.  
Recommended to do only doing during production builds as a minification step.

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
.gGd {
  color: red;
}
._uJ {
  color: green;
}
```

### Usage

```js
const MinimalClassnameGenerator = require('webpack-minimal-classnames')

{
  test: /\.css$/,
  loaders: [
    {
      loader: 'css-loader',
      options: {
        modules: {
          getLocalIdent: MinimalClassnameGenerator()
        }
      }
    }
  ]
}
```

### Options

**length**  
default: 3

### Algorithm

Webpack processes files in a non-deterministic async way so the order in which the classname minification is applied is different on every build. This means we can't simply increment a string/number because the output would be different each time (This is how it worked in 1.0). It works by generating a deterministic hash based on the filepath + local classname, shortens to 3 characters, and applies an incrementor incase of collisions.
