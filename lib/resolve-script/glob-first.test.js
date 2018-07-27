var _ = require('lodash')
var path = require('path')

var base = function (segment) {
  return path.resolve('test/fixtures/unit/glob-first', segment)
}
var options = function (glob, includeDirs) {
  return {pattern: base(glob), nodir: !includeDirs}
}
var subject = require('./glob-first')

module.exports = {
  hitMissMiss: function (done) {
    var patterns = [options('test2?(.*)'), options('test2/index?(.*)'), options('test2/*')]

    subject(patterns, function (er, result) {
      assert.equal(result, base('test2'))
      done(er)
    })
  },
  missHitHit: function (done) {
    var patterns = [options('test?(.*)'), options('test/index?(.*)'), options('test/*')]

    subject(patterns, function (er, result) {
      assert.equal(result, base('test/index.sh'))
      done(er)
    })
  },
  missMissHit: function (done) {
    var patterns = [options('(test3?(.*)'), options('test3/index?(.*)'), options('test3/*')]

    subject(patterns, function (er, result) {
      assert.deepEqual(_.sortBy(result), [base('test3/bar.foo'), base('test3/index2')])
      done(er)
    })
  }
}
