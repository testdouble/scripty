var fs = require('fs')
var _ = require('lodash')

var log = require('./log')

module.exports = function (scriptFile) {
  log('Executing "' + scriptFile + '":\n')
  var script = read(scriptFile)
  if (script) {
    log(_.map(script.split('\n'), function (line) {
      return '> ' + line
    }).join('\n') + '\n\n')
  }
}

function read (scriptFile) {
  try {
    return fs.readFileSync(scriptFile).toString()
  } catch (e) {
    log(
      'Error: scripty - failed trying to read "' + scriptFile + '":\n\n' +
      e.message
    )
  }
}
