var _ = require('lodash')
var glob = require('glob')
var path = require('path')
var async = require('async')

var isExecutable = require('./is-executable')

module.exports = function (pattern, cb) {
  glob(pattern, {nodir: true}, function (er, results) {
    if (er) return cb(er)
    async.map(results, function (result, cb) {
      isExecutable(result, function (er, itIsExecutable) {
        if (itIsExecutable) {
          cb(er, path.resolve(result))
        } else {
          console.warn(
            'Warning: scripty - ignoring script "' + result + '" because it' +
            ' was not executable. Run `chmod +x "' + result + '" if you want' +
            ' scripty to run it.'
          )
          cb(er, undefined)
        }
      })
    }, function (er, results) {
      cb(er, _.compact(results))
    })
  })
}
