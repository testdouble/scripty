var level = require('./log').levels

module.exports = function deriveLogLevel (userOptions) {
  if (!userOptions) return

  if (userOptions.logLevel) return userOptions.logLevel

  if (userOptions.verbose) return level.VERBOSE

  if (userOptions.dryRun) return level.INFO

  if (userOptions.silent || userOptions.quiet) return level.SILENT
}
