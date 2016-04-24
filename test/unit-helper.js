global.td = require('testdouble')

var decorateAssertions = require('./decorate-assertions')
global.assert = decorateAssertions(require('assert'))

var log = require('../lib/run/log')

global.UNSUPPORTED_TDD = require('./is-old-node')
if (UNSUPPORTED_TDD) {
  console.warn('Warning: skipping isolated tests because td.js ' +
               'doesn\'t support ' + process.version)
}

module.exports = {
  afterEach: function () {
    td.reset()
    log.reset()
  }
}
