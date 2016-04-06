global.assert = require('assert')

var rimraf = require('rimraf')
var fs = require('fs')

module.exports = {
  beforeAll: function () {
    fs.mkdirSync('scripts/fake')
  },
  afterAll: function () {
    rimraf.sync('scripts/fake')
  }
}
