var path = require('path')
var _ = require('lodash')
var glob = require('glob')
var async = require('async')

module.exports = function (globPatterns, cb) {
  async.map(globPatterns, function (globOptions, cb) {
    glob(globOptions.pattern, globOptions, cb)
  }, function (er, result) {
    if (er) return cb(er)
    var firstMatches = _(result).reject(_.isEmpty).first()
    cb(er, _.map(firstMatches, function (f) {
      return path.resolve(f)
    }))
  })
}
