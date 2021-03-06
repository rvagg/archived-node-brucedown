var map        = require('map-async')
  , marked     = require('marked')
  , pygmentize = require('pygmentize-bundled')

  , codeCache  = {}

function Processor (source) {
  this.source = source
  this.blocks = []
  marked.setOptions({
      gfm: true
    , pedantic: false
    , sanitize: false
    , highlight: this.highlight.bind(this)
  })
}

Processor.prototype.highlight = function(code, lang, callback) {
  if (typeof lang != 'string')
    return callback(null, code)

  var id = this.blocks.length
  this.blocks.push({ code: code, lang: lang.toLowerCase() })

  process.nextTick(function () {
    callback(null, '<CODEBLOCK id="' + id + '"/>')
  }.bind(this))
}

Processor.prototype.process = function (callback) {
  function rewrite (err, html) {
    if (err)
      return callback(err)

    var newCodeCache = {}

    map(
        this.blocks
      , function (block, callback) {
          var key = block.lang + block.code
          if (codeCache[key])
            return callback(null, newCodeCache[key] = codeCache[key])

          pygmentize({ lang: block.lang, format: 'html' }, block.code, function (err, html) {
            if (err)
              return callback(err)

            callback(null, newCodeCache[key] = html)
          })
        }
      , function (err, blocks) {
          if (err)
            return callback(err)

          blocks.forEach(function (_code, i) {
            var code = _code.toString()
              , re   = new RegExp('<pre><code class="[^"]*"><CODEBLOCK id="' + i + '"/>\\n</code></pre>', 'm')

            html = html.replace(re, code)
          })

          codeCache = newCodeCache
          callback(null, html)
        }
    )
  }

  marked(this.source + '\n', rewrite.bind(this))

  return this
}

module.exports = function (input, callback) {
  new Processor(input).process(callback)
}
