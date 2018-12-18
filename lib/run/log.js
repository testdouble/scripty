var util = require('util')

var isSilent
var output

module.exports = function () {
  if (!isSilent) {
    console.error.apply(this, arguments)
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

module.exports.levels = {
  VERBOSE: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  SILENT: 5
}

module.exports.reset()
