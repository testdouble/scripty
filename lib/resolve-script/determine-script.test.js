module.exports = {
  beforeEach: function () {
    td.replace(console, 'warn')

    this.subject = require('./determine-script')
  },
  zero: function () {
    assert.equal(undefined, this.subject([]))
  },
  one: function () {
    assert.equal('anything', this.subject(['anything']))
  },
  oneBareTwoExtensions: function () {
    assert.equal('anything', this.subject(['/a/b/lol.jk', 'anything', 'anything.js']))
    td.verify(console.warn(
      'Warning: scripty - ignoring "anything.js" in favor of "anything"'
    ))
    td.verify(console.warn(
      'Warning: scripty - ignoring "/a/b/lol.jk" in favor of "anything"'
    ))
  },
  twoExtensions: function () {
    assert.equal('anything.d', this.subject(['anything.z', 'anything.d']))
    td.verify(console.warn(
      'Warning: scripty - ignoring "anything.z" in favor of "anything.d"'
    ))
  }
}
