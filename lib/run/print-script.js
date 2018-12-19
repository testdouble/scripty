var fs = require('fs')
var _ = require('lodash')

var log = require('../log')

module.exports = function (scriptFile) {
  log.info('Executing "' + scriptFile + '":\n')
  var script = read(scriptFile)
  if (script) {
    log.verbose(_.map(script.split('\n'), function (line) {
      return '> ' + line
    }).join('\n') + '\n\n')
  }
}

function read (scriptFile) {
  try {
    return fs.readFileSync(scriptFile).toString()
  } catch (e) {
    log.error(
      'Error: scripty - failed trying to read "' + scriptFile + '":\n\n' +
      e.message
    )
  }
}
