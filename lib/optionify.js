var _ = require('lodash')
var deriveLogLevel = require('./derive-log-level')

var NULL_CB = function () {}
module.exports = function (rawFunc, defaultOptions) {
  return function (mainArg, userOptions, cb) {
    if (typeof userOptions === 'function') {
      cb = userOptions
    }
    if (!cb) {
      cb = NULL_CB
    }

    var logLevel = deriveLogLevel(userOptions)
    if (logLevel) userOptions.logLevel = logLevel

    var fullOptions = _.defaultsDeep({}, userOptions, defaultOptions)
    return rawFunc(mainArg, fullOptions, cb)
  }
}
