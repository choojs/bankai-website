var highlight = require('highlight-syntax/all')
var raw = require('choo/html/raw')
var html = require('choo/html')
var marked = require('marked')
var css = require('sheetify')
var path = require('path')
var fs = require('fs')

css('highlight-syntax-pastel')
var justify = css`:host { text-align: justify }`

var content = fs.readFileSync(path.join(__dirname, '../intl/en.md'), 'utf8')

var TITLE = 'Bankai'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy bg-pink">
      <main class="pa3 cf center">
        <section class="fl mw6 w-third-l pa4 pa3-l">
          <h1>Bankai</h1>
          <p class="mw5">
            <strong>1.</strong>
            A sword configuration from the <a
            href="https://en.wikipedia.org/wiki/Bleach_(anime)"> Bleach
            series</a>.
          </p>
          <p class="mw5">
            <strong>2.</strong> A small compiler that's built to make your sites
            as fast as they can be on today's web.
          </p>
          <a href="https://github.com/choojs/bankai">GitHub</a>
          <a class="pl2" href="https://github.com/choojs/bankai-website">Edit this Site </a>
        </section>

        <section class="fl mw6 w-two-thirds-l pa4 pa3-l">
          ${toHtml(content)}
        </section>
      </main>
    </body>
  `
}

function toHtml (src) {
  var renderer = new marked.Renderer()
  renderer.heading = function (text, level) {
    var indent = ''
    for (var i = 0; i < level; i++) indent += '#'
    var style = `"margin-left: -${level}rem"`
    return `<h${level} class="pointer f5" style=${style}>${indent} ${text} […]</h${level}>`
  }

  renderer.paragraph = function (text) {
    return `<p class="dark-gray ${justify} dn">${text}</p>`
  }

  var els = raw(marked(src, { highlight, renderer }))
  return typeof window !== 'undefined' ? level(els) : els

  function level (els) {
    var ret = []
    var root, container

    for (var el of els) {
      var nodeName = el.nodeName.toLowerCase()
      if (/^h\d{1}$/.test(nodeName)) {
        root = el
        root.addEventListener('click', onclick)
        container = html`<div class="dn"></div>`
        ret.push(el)
        ret.push(container)
      } else {
        if (!root || !container) {
          throw new Error('Are you sure you started with a heading at the top of the section?')
        }
        el.classList.remove('dn') // SSR has all els hidden by default
        container.appendChild(el)
      }
    }

    return ret

    function onclick (e) {
      var root = e.target
      var container = e.target.nextSibling
      var on = container.classList.contains('dn')
      if (on) {
        container.classList.remove('dn')
        root.innerText = root.innerText.replace(' […]', '')
      } else {
        container.classList.add('dn')
        root.innerText += ' […]'
      }
    }
  }
}
