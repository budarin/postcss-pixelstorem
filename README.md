# @budarin/postcss-pixelstorem

(this is a fork of the original plugin for the latest version of postcss https://github.com/putneydm/pixelstorem)

`@budarin/postcss-pixelstorem` is a PostCSS plugin that converts items sized in pixels in CSS code to either rems or ems.

It will convert several types of CSS notation. It is designed to be versatile by doing basic `px to rem` conversion and also to work with legacy code that was written against the deprecated [`Pixels to Rems`][3] and [`Pixels to Ems`][2] Sass functions from [Bourbon][1]. It converts the notations `rem(<value>)` to `rems` and `em(<value>)` to `ems`. It also converts `<value>px` code to `rems` or `ems`.

In `@budarin/postcss-pixelstorem` default mode, an input of:

```css
    h1 {
        font-size: rem(32);
    }
    h2 {
        font-size: em(24):
    }
    p {
        font-size: 16px;
    }
```

will result in an output of:   

```css
    h1 {
        font-size: 2rem;
    }
    h2 {
        font-size: 1.5em:
    }
    p {
        font-size: 1em;
    }
```

## Installation and use

@budarin/postcss-pixelstorem requires [PostCSS][4] to be installed. To install @budarin/postcss-pixelstorem:

``$ npm install --save-dev @budarin/postcss-pixelstorem``

In gulpfile.js

```js
    var postcss = require('gulp-postcss')
    var pixelstorem = require('@budarin/postcss-pixelstorem');
```    

Gulp task:

```js
    gulp.task('css', function() {
        var plugins = [
            pixelstorem()
        ];      
    gulp.src('source/sass/styles.scss')
    .pipe(postcss(plugins))
    .pipe(gulp.dest(public/css));
    });
```

## Defaults

* Default base for conversion is `1rem = 16px`.
* Default output for `rem(<value>)`is `rem`.
* DEfault output for `em(<value>)` is `em`.
* Default output unit for `<value>px` is `rem`.
* Default is to convert values in media and container queries.

## Options

`@budarin/postcss-pixelstorem` accepts optional settings that override default settings.

```js
    gulp.task('css', function() {
        var plugins = [
          pixelstorem({
            base: <value>,
            unit: "rem" or "em",
            exclude: ["declaration"]
          })
        ];
        gulp.src('source/sass/styles.scss')
        .pipe(postcss(plugins))
        .pipe(gulp.dest(public/css));
    });
```

Optional values:
* `base: <value>` - Accepts a unitless value. Resets the base font size for conversion to rems or ems. Default value is `16`.
* `unit: "rem" or "em"` - Accepts unit value of either `"rem"` or `"em"` as a string. All items will be output in the unit value set here, including values set by `rem(<value>)` or `em(<value>)` notation. Default value is `rem`.
* `exclude: ["declaration"]` - any declaration type to exclude from conversion, eg, `border`, `border-radius`, etc. These declarations will be excluded globally. Default value is `[]`.
* `mediaQueries: boolean` Setting this to `false` prevents conversion of values in media and container queries. Default value is `true`.


Links:

<pre>
[1]: http://bourbon.io/
[2]: http://bourbon.io/docs/#px-to-em
[3]: http://bourbon.io/docs/#px-to-rem
[4]: http://postcss.org/
</pre>