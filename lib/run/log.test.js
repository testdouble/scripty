var subject = require('./log')

module.exports = {
  beforeEach: function () {
    td.replace(console, 'error')
    subject.reset()
  },
  writesToStderr: function () {
    subject('foo')

    td.verify(console.error('foo'))
  },
  modeSwitchCapturesLogs: function () {
    subject.shush()

    subject('bar')
    subject('baz', 'noz')

    td.verify(console.error(), { ignoreExtraArgs: true, times: 0 })
    assert.equal(subject.read(), 'bar\nbaz noz\n')
  },
  resetResetsMode: function () {
    subject.shush()

    subject.reset()

    subject('biz')
    td.verify(console.error('biz'))
  },
  resetResetsLog: function () {
    subject.shush()
    subject('lalalal')

    subject.reset()

    assert.equal(subject.read(), '')
  }

}
