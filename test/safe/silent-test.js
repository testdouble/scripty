var runScripty = require('../run-scripty')
var log = require('../../lib/run/log')

module.exports = function doesNotEchoScriptContentInSilentMode (done) {
  var oldConsole = global.console
  global.console = {} // blow up if a console method is invoked

  runScripty('hello:world', { logLevel: log.levels.SILENT }, function (er, code, stdio) {
    global.console = oldConsole
    done(er)
  })
}
