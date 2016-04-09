var path = require('path')

module.exports = {
  beforeEach: function () {
    this.subject = require('./generate-glob')
    this.root = path.resolve('test/fixtures/user-scripts')
  },
  fileInADir: function () {
    assert.equal(this.root + '/foo/bar*', this.subject(this.root, 'foo:bar'))
  },
  nonExistentFile: function () {
    assert.equal(this.root + '/fake/stuff*', this.subject(this.root, 'fake:stuff'))
  },
  dirWithNoIndex: function () {
    assert.equal(this.root + '/baz/*', this.subject(this.root, 'baz'))
  },
  dirWithAnIndexFile: function () {
    assert.equal(this.root + '/car/index*', this.subject(this.root, 'car'))
  },
  dirWithADirNamedIndex: function () {
    assert.equal(this.root + '/dog/*', this.subject(this.root, 'dog'))
  }
}
