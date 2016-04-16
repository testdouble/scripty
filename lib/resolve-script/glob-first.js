var _ = require('lodash')
var glob = require('glob')
var async = require('async')

module.exports = function (globPatterns, cb) {
  async.map(globPatterns, function (globPattern, cb) {
    glob(globPattern, {nodir: true}, cb)
  }, function (er, result) {
    cb(er, _(result).reject(_.isEmpty).first())
  })
}
