var _ = require('lodash')

module.exports = function (func, items, options) {
  return _.map(items, function (item) {
    return function (cb) {
      func(item, options, cb)
    }
  })
}

