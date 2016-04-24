var runScripty = require('../run-scripty')
var log = require('../../lib/run/log')

module.exports = function doesNotRunButPrintResolvedScripts (done) {
  runScripty('hello:world', {dryRun: true}, function (er, code, stdio) {
    assert.includes(log.read(), 'This is a dry run. Executed scripts would be:')
    if (process.platform === 'win32') {
      assert.includes(log.read(), 'built-in-scripts-win\\hello\\world')
      assert.includes(log.read(), 'Hello, %WORLD%')
    } else {
      assert.includes(log.read(), 'built-in-scripts/hello/world')
      assert.includes(log.read(), 'Hello, $WORLD')
    }
    assert.equal(stdio.stdout, '', 'There should be no script output on stdout')
    done(er)
  })
}
