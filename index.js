var css = require('sheetify')
var choo = require('choo')

css('tachyons')
css`
  .pink { color: rgb(255, 229, 229) }
  .bg-pink { background-color: rgb(255, 229, 229) }
`

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

app.route('/', require('./views/main'))
app.route('/*', require('./views/404'))

if (!module.parent) app.mount('body')
else module.exports = app
