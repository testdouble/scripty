var decorateAssertions = require('./decorate-assertions')
global.assert = decorateAssertions(require('assert'))

var log = require('../lib/run/log')

module.exports = {
  afterEach: function () {
    log.reset()
  }
}
