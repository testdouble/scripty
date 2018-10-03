var path = require('path')

module.exports = {
  beforeEach: function () {
    this.resolvePkg = td.replace('resolve-pkg')
    this.subject = require('./glob-patterns')
  },
  simpleCase: function () {
    var result = this.subject(__dirname, 'foo:bar')

    assert.equal(result.length, 3)
    assert.equal(result[0], path.resolve(__dirname, 'foo/bar') + '+(|.*)')
    assert.equal(result[1], path.resolve(__dirname, 'foo/bar/index') + '+(|.*)')
    assert.equal(result[2], path.resolve(__dirname, 'foo/bar/*'))
  },
  modulesCase: function () {
    td.when(this.resolvePkg('bar/scripts')).thenReturn('./node_modules/bar/scripts')
    td.when(this.resolvePkg('baz/scripts')).thenReturn('./node_modules/baz/scripts')

    var result = this.subject(__dirname, 'foo:bar', { modules: ['bar', 'baz'] })

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
