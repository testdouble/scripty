var util = require('util')

var isSilent
var output
var LEVELS = {
  VERBOSE: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  SILENT: 5
}

module.exports = function () {
  if (!isSilent) {
    console.error.apply(this, arguments)
  } else {
    output += util.format.apply(util, arguments) + '\n'
  }
}

module.exports.levels = LEVELS

module.exports.shush = function () {
  isSilent = true
}

module.exports.read = function () {
  return output
}

module.exports.reset = function () {
  isSilent = false
  output = ''
  module.exports.level(LEVELS.INFO)
}

module.exports.level = function (level) {
  for (var l in LEVELS) {
    var methodName = l.toLowerCase()
    if (level <= LEVELS[l]) {
      module.exports[methodName] = console.error
    } else {
      module.exports[methodName] = silentLogger
    }
  }
}

function silentLogger () {
  output += util.format.apply(util, arguments) + '\n'
}

module.exports.reset()
