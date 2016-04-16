var _ = require('lodash')
var path = require('path')

var base = function (segment) {
  return path.resolve('test/fixtures/unit/glob-first', segment)
}
var subject = require('./glob-first')

module.exports = {
  hitMissMiss: function (done) {
    var patterns = [base('test2+(|.*)'), base('test2/index+(|.*)'), base('test2/*')]

    subject(patterns, function (er, result) {
      assert.equal(result, base('test2'))
      done(er)
    })
  },
  missHitHit: function (done) {
    var patterns = [base('test+(|.*)'), base('test/index+(|.*)'), base('test/*')]

    subject(patterns, function (er, result) {
      assert.equal(result, base('test/index.sh'))
      done(er)
    })
  },
  missMissHit: function (done) {
    var patterns = [base('(test3+(|.*)'), base('test3/index+(|.*)'), base('test3/*')]

    subject(patterns, function (er, result) {
      assert.deepEqual(_.sortBy(result), [base('test3/bar.foo'), base('test3/index2')])
      done(er)
    })
  }
}
