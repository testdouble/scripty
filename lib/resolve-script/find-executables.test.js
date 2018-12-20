var _ = require('lodash')
var path = require('path')
var log = require('../log')

var base = function (glob) {
  return path.resolve('test/fixtures/unit/find-executables', glob)
}
var subject = require('./find-executables')

module.exports = {
  beforeEach: function () {
    log.level = 'silent'
  },
  noFilesFound: function (done) {
    subject([base('does-not-exist*')], function (er, result) {
      assert.deepEqual(result, [])
      done(er)
    })
  },
  oneFileFound: function (done) {
    subject([base('is-executable*')], function (er, result) {
      assert.deepEqual(result, [base('is-executable')])
      done(er)
    })
  },
  oneFileFoundWithOneNonExecutable: function (done) {
    if (process.platform === 'win32') return done()
    subject([base('file.*')], function (er, result) {
      assert.deepEqual(result, [base('file.executable')])
      assert.includes(log.read(),
        `scripty WARN Ignoring script '${base('file.not.executable')}' because it was not readable/executable.\n` +
        `scripty WARN Run \`chmod u+rx '${base('file.not.executable')}'\` if you want scripty to run it.`
      )
      done(er)
    })
  },
  twoFilesFound: function (done) {
    subject([base('exec.*')], function (er, result) {
      assert.deepEqual(_.sortBy(result), [base('exec.rb'), base('exec.sh')])
      done(er)
    })
  },
  dirFound: function (done) {
    subject([base('exec-dir-wat*')], function (er, result) {
      assert.deepEqual(result, [])
      done(er)
    })
  }
}
