var _ = require('lodash')

var isSilent = false
var output = ''

module.exports = function () {
  if (!isSilent) {
    if (_.startsWith(arguments[0], 'Error:')) {
      console.error.apply(this, arguments)
    } else {
      console.log.apply(this, arguments)
    }
  } else {
    output += _.toArray(arguments).join(' ') + '\n'
  }
}

module.exports.shush = function () {
  isSilent = true
}

module.exports.read = function () {
  return output
}

module.exports.reset = function () {
  isSilent = false
  output = ''
}
