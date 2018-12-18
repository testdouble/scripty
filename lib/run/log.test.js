var subject = require('./log')
var LEVEL = subject.levels

module.exports = {
  beforeEach: function () {
    td.replace(console, 'error')
    subject.reset()
  },
  writesToStderr: function () {
    subject.info('foo')

    td.verify(console.error('foo'))
  },
  setTheLogLevel: {
    verbose: function () {
      subject.level(LEVEL.VERBOSE)
      subject.verbose('ity')
      td.verify(console.error('ity'))
    },
    info: function () {
      subject.level(LEVEL.INFO)
      td.when(console.error('ity')).thenThrow(new Error('Should not log verbose calls at INFO level'))
      subject.verbose('ity')
      subject.info('mation')
      td.verify(console.error('mation'))
    },
    warn: function () {
      subject.level(LEVEL.WARN)
      td.when(console.error('mation')).thenThrow(new Error('Should not log info calls at WARN level'))
      subject.info('mation')
      subject.warn('ing')
      td.verify(console.error('ing'))
    },
    error: function () {
      subject.level(LEVEL.ERROR)
      td.when(console.error('ing')).thenThrow(new Error('Should not log warn calls at ERROR level'))
      subject.warn('ing')
      subject.error('fail')
      td.verify(console.error('fail'))
    },
    silent: function () {
      subject.shush()
      td.when(console.error('fail')).thenThrow(new Error('Should not log error calls at SILENT level'))
      subject.error('fail')
    }
  },
  modeSwitchCapturesLogs: function () {
    subject.shush()

    subject.info('bar')
    subject.info('baz', 'noz')

    td.verify(console.error(), { ignoreExtraArgs: true, times: 0 })
    assert.equal(subject.read(), 'bar\nbaz noz\n')
  },
  resetResetsMode: function () {
    subject.shush()

    subject.reset()

    subject.info('biz')
    td.verify(console.error('biz'))
  },
  resetResetsLog: function () {
    subject.shush()
    subject.info('lalalal')

    subject.reset()

    assert.equal(subject.read(), '')
  }

}
