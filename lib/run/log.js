var util = require('util')

var output
var LEVELS = {
  VERBOSE: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  SILENT: 5
}

module.exports = {}

module.exports.levels = LEVELS

module.exports.shush = function () {
  module.exports.level(LEVELS.SILENT)
}

module.exports.read = function () {
  return output
}

module.exports.reset = function () {
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
