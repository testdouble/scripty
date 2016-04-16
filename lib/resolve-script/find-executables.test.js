var _ = require('lodash')
var path = require('path')

var base = function (glob) {
  return path.resolve('test/fixtures/unit/find-executables', glob)
}
var subject = require('./find-executables')

module.exports = {
  beforeEach: function () {
    td.replace(console, 'warn')
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
      td.verify(console.warn(
        'Warning: scripty - ignoring script "' + base('file.not.executable') +
        '" because it was not executable. Run `chmod +x "' +
        base('file.not.executable') + '" if you want scripty to run it.'
      ))
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

