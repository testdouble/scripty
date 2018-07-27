var _ = require('lodash')

var NULL_CB = function () {}
module.exports = function (rawFunc, defaultOptions) {
  return function (mainArg, userOptions, cb) {
    if (typeof userOptions === 'function') {
      cb = userOptions
    }
    if (!cb) {
      cb = NULL_CB
    }
    var fullOptions = _.defaultsDeep({}, userOptions, defaultOptions)
    return rawFunc(fullOptions.target || mainArg, fullOptions, cb)
  }
}
