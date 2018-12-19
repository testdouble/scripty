var util = require('util')

var output
var LEVELS = {
  VERBOSE: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  SILENT: 5
}

module.exports = {
  levels: LEVELS,

  read: function () {
    return output
  },

  reset: function () {
    output = ''
    module.exports.level(LEVELS.INFO)
  },

  level: function (level) {
    for (var l in LEVELS) {
      var methodName = l.toLowerCase()
      if (normalize(level) <= LEVELS[l]) {
        module.exports[methodName] = formatError(console.error)
      } else {
        module.exports[methodName] = silentLogger
      }
    }
  }
}

module.exports.reset()

// private

function normalize (level) {
  for (var l in LEVELS) {
    if (level === LEVELS[l] ||
      l === String(level).toUpperCase()) {
      return LEVELS[l]
    }
  }

  return LEVELS.INFO
}

function formatError (f) {
  return function () {
    f.apply(null, Array.from(arguments, function (arg) {
      return arg instanceof Error ? arg.message : arg
    }))
  }
}

function silentLogger () {
  output += util.format.apply(util, arguments) + '\n'
}
