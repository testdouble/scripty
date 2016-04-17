var _ = require('lodash')

var runScripty = require('../run-scripty')
var log = require('../../lib/log')

module.exports = function doesNotRunButPrintScripts (done) {
  runScripty('hello:world', {dryRun: true}, function (er, code, stdio) {
    if (process.platform === 'win32') {
      assert.includes(log.read(), 'built-in-scripts-win\\hello\\world')
    } else {
      assert.includes(log.read(), 'built-in-scripts/hello/world')
    }
    assert.ok(!_.includes(stdio.stdout, 'Hello, World!'), 'Stdout includes "Hello World!"')
    done(er)
  })
}
