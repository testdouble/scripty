var subject = require('./log')

module.exports = {
  beforeEach: function () {
    td.replace(console, 'log')
    td.replace(console, 'error')
    subject.reset()
  },
  normallyJustLogs: function () {
    subject('foo')

    td.verify(console.log('foo'))
  },
  consoleErrorsWhenStartingWithError: function () {
    subject('Error: foo')

    td.verify(console.error('Error: foo'))
  },
  modeSwitchCapturesLogs: function () {
    subject.shush()

    subject('bar')
    subject('baz', 'noz')

    td.verify(console.log(), {ignoreExtraArgs: true, times: 0})
    assert.equal(subject.read(), 'bar\nbaz noz\n')
  },
  resetResetsMode: function () {
    subject.shush()

    subject.reset()

    subject('biz')
    td.verify(console.log('biz'))
  },
  resetResetsLog: function () {
    subject.shush()
    subject('lalalal')

    subject.reset()

    assert.equal(subject.read(), '')
  }

}
