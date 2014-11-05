#!/usr/bin/env node

const brucedown = require('./')
    , fs        = require('fs')

function usageAndExit () {
  console.error('Usage: brucedown <markdown file> <output file>')
  process.exit(-1)
}

if (process.argv.length < 4)
  return usageAndExit()

if (!fs.existsSync(process.argv[2])) {
  console.error('File "' + process.argv[2] + '" does not exist')
  return usageAndExit()
}

brucedown(fs.readFileSync(process.argv[2], 'utf8'), function (err, data) {
  if (err)
    throw err

  fs.writeFileSync(process.argv[3], data, 'utf8')
})