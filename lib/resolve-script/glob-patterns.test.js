var path = require('path')
var subject = require('./glob-patterns')

module.exports = {
  simpleCase: function () {
    var result = subject(__dirname, 'foo:bar', [])

    assert.equal(result.length, 3)
    assert.equal(result[0], path.resolve(__dirname, 'foo/bar') + '+(|.*)')
    assert.equal(result[1], path.resolve(__dirname, 'foo/bar/index') + '+(|.*)')
    assert.equal(result[2], path.resolve(__dirname, 'foo/bar/*'))
  },
  modulesCase: function () {
    var result = subject(
      __dirname,
      'foo:bar',
      [
        path.join(process.cwd(), 'node_modules/bar/scripts'),
        path.join(process.cwd(), 'node_modules/baz/scripts')
      ]
    )

    assert.equal(result.length, 9)
    assert.equal(result[0], path.resolve(__dirname, 'foo/bar') + '+(|.*)')
    assert.equal(result[1], path.resolve(__dirname, 'foo/bar/index') + '+(|.*)')
    assert.equal(result[2], path.resolve(__dirname, 'foo/bar/*'))

    assert.equal(result[3], path.resolve(process.cwd(), 'node_modules/bar/scripts/foo/bar') + '+(|.*)')
    assert.equal(result[4], path.resolve(process.cwd(), 'node_modules/bar/scripts/foo/bar/index') + '+(|.*)')
    assert.equal(result[5], path.resolve(process.cwd(), 'node_modules/bar/scripts/foo/bar/*'))

    assert.equal(result[6], path.resolve(process.cwd(), 'node_modules/baz/scripts/foo/bar') + '+(|.*)')
    assert.equal(result[7], path.resolve(process.cwd(), 'node_modules/baz/scripts/foo/bar/index') + '+(|.*)')
    assert.equal(result[8], path.resolve(process.cwd(), 'node_modules/baz/scripts/foo/bar/*'))
  }
}
