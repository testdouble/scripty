var subject = require('./log')

module.exports = {
  beforeEach: function () {
    td.replace(console, 'error')
    subject.reset()
  },
  writesToStderr: function () {
    subject.info('foo')

    td.verify(console.error('scripty >', 'foo'))
  },
  setTheLogLevel: {
    verbose: function () {
      subject.level = subject.verbose
      subject.verbose('ity')
      td.verify(console.error('scripty >', 'ity'))
    },
    info: function () {
      subject.level = subject.info
      td.when(console.error('ity')).thenThrow(new Error('Should not log verbose calls at INFO level'))
      subject.verbose('ity')
      subject.info('mation')
      td.verify(console.error('scripty >', 'mation'))
    },
    warn: function () {
      subject.level = subject.warn
      td.when(console.error('mation')).thenThrow(new Error('Should not log info calls at WARN level'))
      subject.info('mation')
      subject.warn('ing')
      td.verify(console.error('scripty WARN', 'ing'))
    },
    error: function () {
      subject.level = subject.error
      td.when(console.error('ing')).thenThrow(new Error('Should not log warn calls at ERROR level'))
      subject.warn('ing')
      subject.error('fail')
      td.verify(console.error('scripty ERR!', 'fail'))
    },
    silent: function () {
      subject.level = subject.silent
      td.when(console.error('fail')).thenThrow(new Error('Should not log error calls at SILENT level'))
      subject.error('fail')
    }
  },
  modeSwitchCapturesLogs: function () {
    subject.level = subject.silent

    subject.info('bar')
    subject.info('baz', 'noz')

    td.verify(console.error(), { ignoreExtraArgs: true, times: 0 })
    assert.equal(subject.read(), 'scripty > bar\nscripty > baz noz\n')
  },
  resetResetsMode: function () {
    subject.level = subject.silent

    subject.reset()

    subject.info('biz')
    td.verify(console.error('scripty >', 'biz'))
  },
  resetResetsLog: function () {
    subject.level = subject.silent

    subject.info('lalalal')

    subject.reset()

    assert.equal(subject.read(), '')
  }
}
