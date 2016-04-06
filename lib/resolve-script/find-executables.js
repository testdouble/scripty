var glob = require('glob')
var async = require('async')
var fs = require('fs')
var _ = require('lodash')

module.exports = function (pattern, cb) {
  glob(pattern, function (er, results) {
    async.map(results, function (result, cb) {
      fs.access(result, fs.X_OK, function (er) {
        if (!er) {
          cb(null, result)
        } else {
          console.warn(
            'Warning: scripty - ignoring script "' + result + '" because it' +
            ' was not executable. Run `chmod +x "' + result + '" if you want' +
            ' scripty to run it.'
          )
          cb(null, undefined)
        }
      })
    }, function (er, results) {
      cb(er, _.compact(results))
    })
  })
}

