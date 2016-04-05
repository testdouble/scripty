global.td = require('testdouble')
global.assert = require('assert')

var rimraf = require('rimraf')
var fs = require('fs')

module.exports = {
  beforeAll: function () {
    fs.mkdirSync('scripts/fake')
  },
  afterEach: function () {
    td.reset()
  },
  afterAll: function () {
    rimraf.sync('scripts/fake')
  }
}
