## Introduction
The WEB PLATFORM is doing amazing! We have a multi-language, standardized
VIRTUAL MACHINE with a graphical layer running on virtually every device. If you
want to share your things with an audience, there’s nothing with a wider reach!

However, building for the WEB PLATFORM is by no means simple. There’s a lot
that’s possible, which means there’s a lot to learn. But that shouldn’t prevent
it from being easy to build things.

And that’s where BANKAI comes in. We wanted to have a tool that makes it easy to
build things for the web. And as the Web evolves, it figures out how to apply
the latest optimizations to your project. You shouldn’t need to be an expert to
do the right thing.

The same goes for tooling though. A lot of tools come with options, flags and
switches everywhere. It can take a while to learn. BANKAI does away with all
this, exposing 3 commands to perform 3 different tasks.

## Optimizations
Bankai applies lots of optimizations to projects. Generally you won't need to
care how we do this: it's lots of glue code, and not necessarily pretty. But it
can be useful to know which optimizations we apply. This is a list:

### JavaScript
- __bundle-collapser:__ Remove all pathnames from inside the bundle, and
  replace them with IDs. This not only makes bundles smaller, it prevents
  details from your local dev setup leaking.
- __common-shakeify:__ Remove unused JavaScript code from the bundle. Best
  known as _dead code elimination_ or _tree shaking_.
- __unassertify:__ Remove all `require('assert')` statements from the code.
  Only applied for production builds.
- __uglifyify:__ Minify the bundle.
- __yo-yoify:__ Optimize `choo` HTML code so it run significantly faster in the
  browser.
- __glslify:__ Adds a module system to GLSL shaders.
- __envify:__ Allow environment variables to be used in the bundle. Especially
  useful in combination with minification, which removes unused code paths.
- __brfs:__ Statically inline calls to `fs.readFile()`. Useful to ship assets
  in the browser.

### CSS
- __sheetify:__ extract all inline CSS from JavaScript, and include it in
  `bundle.js`.
- __purifyCSS:__ removes unused CSS from the project.
- __cleanCSS:__ minify the bundle.

### HTML
- __inline-critical-css:__ extract all crititical CSS for a page into the
  `<head>` of the document. This means that every page will be able to render
  after the first roundtrip, which makes for super snappy pages.
- __async load scripts:__ loads scripts in the background using the
  [`defer`](https://devdocs.io/html/attributes#defer-attribute) attribute.
- __async load styles:__ loads styles in the background using the
  [`preload`](https://devdocs.io/html/attributes#preload-attribute) attribute.
- __async load styles:__ preloads fonts in the background using the
  [`preload`](https://devdocs.io/html/attributes#preload-attribute) attribute.
- __server render:__ server renders Choo applications. We're welcome to
  supporting other frameworks too. PRs welcome!
- __manifest:__ includes a link to `manifest.json` so the application can be
  installed on mobile.
- __viewport:__ defines the right viewport dimensions to make applications
  accessible for everyone.
- __theme color:__ sets the theme color defined in `manifest.json` so the
  navigator bar on mobile is styled on brand.
- __title:__ sets the right title on a page. Either extracts it from the
  application (choo only, for now) or uses whatever the title is in
  `manifest.json`.
- __live reload:__ during development, we inject a live reload script.

## Configuration
Tbi.

## HTTP
Tbi.

## Babel
Tbi.

## Events
Tbi.
