var path = require('path')
var _ = require('lodash')

var runScripty = require('../run-scripty')
var log = require('../../lib/log')

module.exports = function doesNotRunButPrintScripts (done) {
  runScripty('hello:world', {dryRun: true}, function (er, code, stdio) {
    assert.includes(log.read(), 'built-in-scripts' + path.sep + 'hello' + path.sep + 'world')
    assert.ok(!_.includes(stdio.stdout, 'Hello, World!'), 'Stdout includes "Hello World!"')
    done(er)
  })
}
