var assert = require('assert')
  , brucedown = require('./')

  , cases = [
        {
            input: '```js\nvar a = "b";\n```'
          , output: '<div class="highlight"><pre><span class="kd">var</span> <span class="nx">a</span> <span class="o">=</span> <span class="s2">&quot;b&quot;</span><span class="p">;</span></pre></div>'
        }
      , {
            input: '```c\nbool a = true;\n```'
          , output: '<div class="highlight"><pre><span class="kt">bool</span> <span class="n">a</span> <span class="o">=</span> <span class="nb">true</span><span class="p">;</span></pre></div>'
        }
      , {
            input: '#Foo!\n##bar\n`bang`\n\nboom'
          , output: '<h1 id="foo-">Foo!</h1><h2 id="bar">bar</h2><p><code>bang</code></p><p>boom</p>'
        }
    ]

cases.forEach(function (c) {
  brucedown(c.input, function (err, result) {
    assert.equal(err, null)
    result = result.toString().replace(/\n/g, '')
    assert.equal(result, c.output)
  })
})