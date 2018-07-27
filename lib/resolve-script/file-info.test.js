var path = require('path')
var fs = require('fs')

var root = path.resolve('test/fixtures/user-scripts/stats')
var subject = require('./file-info')
module.exports = {
  bazIsDir: function (done) {
    subject(root + '/baz', function (er, answer) {
      assert.equal(answer.isDirectory(), true)
      done(er)
    })
  },
  keepIsNotDir: function (done) {
    subject(root + '/baz/.keep', function (er, answer) {
      assert.equal(answer.isDirectory(), false)
      done(er)
    })
  },
  allXIsX: function (done) {
    fs.chmodSync(root + '/all-x', '755')
    subject(root + '/all-x', function (er, answer) {
      assert.equal(answer.isExecutable(), true)
      done(er)
    })
  },
  userXIsX: function (done) {
    fs.chmodSync(root + '/owner-x', '744')
    subject(root + '/owner-x', function (er, answer) {
      assert.equal(answer.isExecutable(), true)
      done(er)
    })
  },
  groupXIsX: function (done) {
    fs.chmodSync(root + '/group-x', '654')
    subject(root + '/group-x', function (er, answer) {
      assert.equal(answer.isExecutable(), true)
      done(er)
    })
  },
  othersXIsX: function (done) {
    fs.chmodSync(root + '/other-x', '645')
    subject(root + '/other-x', function (er, answer) {
      assert.equal(answer.isExecutable(), true)
      done(er)
    })
  },
  noXIsNotX: function (done) {
    if (process.platform === 'win32') return done()
    fs.chmodSync(root + '/no-x', '644')
    subject(root + '/no-x', function (er, answer) {
      assert.equal(answer.isExecutable(), false)
      done(er)
    })
  },
  anyWindowsIsAllX: function (done) {
    if (process.platform !== 'win32') return done()
    subject(root + '/silly-lololo', function (er, answer) {
      assert.equal(answer.isExecutable(), true)
      done(er)
    })
  }
}
