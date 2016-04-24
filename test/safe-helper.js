require('espower-loader')({
  cwd: process.cwd(),
  pattern: 'test/safe/**/*.js'
})

var decorateAssertions = require('./decorate-assertions')
global.assert = decorateAssertions(require('power-assert'))

var log = require('../lib/log')

module.exports = {
  beforeEach: function () {
    log.shush()
  },
  afterEach: function () {
    log.reset()
  }
}
