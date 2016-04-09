var fs = require('fs')
var _ = require('lodash')

var log = require('./log')

module.exports = function (script) {
  log('Executing "' + script + '":\n')
  log(_.map(read(script).split('\n'), function (line) {
    return '> ' + line
  }).join('\n') + '\n\n')

}

function read (script) {
  try {
    return fs.readFileSync(script).toString()
  } catch (e) {
    throw new Error(
      'scripty - failed trying to read "' + script + '":\n\n' + e.message
    )
  }
}
