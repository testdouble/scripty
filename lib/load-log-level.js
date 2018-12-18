var loadOption = require('./load-option')
var level = require('./run/log').levels

module.exports = function () {
  var logLevel = String(loadOption('logLevel')).toUpperCase()

  if (level[logLevel]) {
    return level[logLevel]
  }

  if (loadOption('verbose')) {
    return level.VERBOSE
  }

  if (loadOption('dryRun')) {
    return level.INFO
  }

  if (loadOption('silent') || loadOption('quiet')) {
    return level.SILENT
  }

  return level.INFO
}
