var path = require('path')
var fs = require('fs')

var root = path.resolve('test/fixtures/user-scripts/stats')
var subject = require('./is-executable')
module.exports = {
  allXIsX: function (done) {
    fs.chmodSync(root + '/all-x', '755')
    subject(root + '/all-x', function (er, answer) {
      assert.equal(answer, true)
      done(er)
    })
  },
  userXIsX: function (done) {
    fs.chmodSync(root + '/owner-x', '744')
    subject(root + '/owner-x', function (er, answer) {
      assert.equal(answer, true)
      done(er)
    })
  },
  groupXIsX: function (done) {
    fs.chmodSync(root + '/group-x', '654')
    subject(root + '/group-x', function (er, answer) {
      assert.equal(answer, true)
      done(er)
    })
  },
  othersXIsX: function (done) {
    fs.chmodSync(root + '/other-x', '645')
    subject(root + '/other-x', function (er, answer) {
      assert.equal(answer, true)
      done(er)
    })
  },
  noXIsNotX: function (done) {
    if (process.platform === 'win32') return done()
    fs.chmodSync(root + '/no-x', '644')
    subject(root + '/no-x', function (er, answer) {
      assert.equal(answer, false)
      done(er)
    })
  },
  anyWindowsIsAllX: function (done) {
    if (process.platform !== 'win32') return done()
    subject(root + '/silly-lololo', function (er, answer) {
      assert.equal(answer, true)
      done(er)
    })
  }
}
