var path = require('path')

var base = path.resolve('test/fixtures/user-scripts')
module.exports = {
  beforeEach: function () {
    this.subject = require('./generate-glob')
  },
  fileInADir: function () {
    assert.equal(this.subject(base, 'foo:bar'), globFor('foo/bar'))
  },
  nonExistentFile: function () {
    assert.equal(this.subject(base, 'fake:stuff'), globFor('fake/stuff'))
  },
  dirWithNoIndex: function () {
    assert.equal(this.subject(base, 'baz'), globFor('baz/'))
  },
  dirWithAnIndexFile: function () {
    assert.equal(this.subject(base, 'car'), globFor('car/index'))
  },
  dirWithADirNamedIndex: function () {
    assert.equal(this.subject(base, 'dog'), globFor('dog/'))
  }
}

function globFor (partialPath) {
  return path.join(base, partialPath) + '*'
}
