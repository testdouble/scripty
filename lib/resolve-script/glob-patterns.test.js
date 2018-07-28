var path = require('path')

var subject = require('./glob-patterns')
module.exports = {
  simpleCase: function () {
    var result = subject(__dirname, 'foo:bar')

    assert.equal(result.length, 3)
    assert.equal(result[0].pattern, path.resolve(__dirname, 'foo/bar') + '?(.*)')
    assert.equal(result[1].pattern, path.resolve(__dirname, 'foo/bar/index') + '?(.*)')
    assert.equal(result[2].pattern, path.resolve(__dirname, 'foo/bar/*'))
  }
}
