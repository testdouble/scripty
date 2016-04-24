var decorateAssertions = require('./decorate-assertions')
global.assert = decorateAssertions(require('assert'))

var log = require('../lib/run/log')

module.exports = {
  beforeEach: function () {
    log.shush()
  },
  afterEach: function () {
    log.reset()
  }
}
