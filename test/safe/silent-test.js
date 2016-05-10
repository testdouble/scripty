var runScripty = require('../run-scripty')
var log = require('../../lib/run/log')

module.exports = function doesNotEchoScriptContentInSilentMode (done) {
  runScripty('hello:world', {silent: true}, function (er, code, stdio) {
    assert.equal(log.read(), '')
    done(er)
  })
}
