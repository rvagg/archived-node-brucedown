# Brucedown

A near-perfect GitHub style Markdown to HTML converter
------------------------------------------------------

A very simple processor that leans heavily on dependencies to get the job done.

Built primarily for [Morkdown](https://github.com/rvagg/morkdown) but useful wherever you want to produce the same HTML that GitHub does when processing Markdown.

There are some *very minor* differences due to the fact that Brucedown uses [Marked](https://github.com/chjj/marked) (JavaScript) rather than [Sundown](https://github.com/vmg/sundown) (C) for the Markdown conversion.

Brucedown uses [Pygments](http://pygments.org/) to do syntax highlighting just like GitHub so code even comes out the same.

Currently the interface is very simple:

```js
var brucedown = require('brucedown')

brucedown(markdownSource, function (err, htmlResult) {
  console.log(htmlResult)
})
```

Licence & copyright
-------------------

Brucedown is Copyright (c) 2012 Rod Vagg <@rvagg> and licenced under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.