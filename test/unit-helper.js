global.td = require('testdouble')
global.assert = require('assert')

module.exports = {
  afterEach: function () {
    td.reset()
  }
}
