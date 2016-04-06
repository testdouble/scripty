var _ = require('lodash')
var path = require('path')

module.exports = function (matches) {
  if (matches.length === 0) {
    return
  } else if (matches.length === 1) {
    return matches[0]
  } else {
    var sorted = _.sortBy(matches, function (match) {
      return path.extname(match)
    })
    var winner = sorted[0]

    _(sorted).tail().each(function (match) {
      console.warn('Warning: scripty - ignoring "' + match + '" in favor of "' + winner + '"')
    })

    return winner
  }
}

