global.assert = require('assert')

var rimraf = require('rimraf')
var fs = require('fs')

module.exports = {
  beforeEach: function () {
    rimraf.sync('scripts/fake')
    fs.mkdirSync('scripts/fake')
  },
  afterEach: function () {
    rimraf.sync('scripts/fake')
  }
}
