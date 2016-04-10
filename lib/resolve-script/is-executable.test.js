var path = require('path')

var root = path.resolve('test/fixtures/user-scripts/stats')
var subject = require('./is-executable')
module.exports = {
  allXIsX: function (done) {
    subject(root + '/all-x', function (er, answer) {
      assert.equal(answer, true)
      done(er)
    })
  },
  userXIsX: function (done) {
    subject(root + '/owner-x', function (er, answer) {
      assert.equal(answer, true)
      done(er)
    })
  },
  groupXIsX: function (done) {
    subject(root + '/group-x', function (er, answer) {
      assert.equal(answer, true)
      done(er)
    })
  },
  othersXIsX: function (done) {
    subject(root + '/other-x', function (er, answer) {
      assert.equal(answer, true)
      done(er)
    })
  },
  noXIsNotX: function (done) {
    subject(root + '/no-x', function (er, answer) {
      assert.equal(answer, false)
      done(er)
    })
  }
}
