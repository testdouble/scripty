var runScripty = require('../run-scripty')

module.exports = function doesNotEchoScriptContentInSilentMode (done) {
  var oldConsole = global.console
  global.console = {} // blow up if a console method is invoked

  runScripty('hello:world', { logLevel: 'silent' }, function (er, code, stdio) {
    global.console = oldConsole
    done(er)
  })
}
