var _ = require('lodash')
var util = require('util')

var isSilent
var output

module.exports = function () {
  if (!isSilent) {
    if (_.startsWith(arguments[0], 'Error:')) {
      console.error.apply(this, arguments)
    } else {
      console.log.apply(this, arguments)
    }
  } else {
    output += util.format.apply(util, arguments) + '\n'
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

module.exports.reset()
