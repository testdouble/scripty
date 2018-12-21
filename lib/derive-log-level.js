var log = require('./log')

module.exports = function deriveLogLevel (userOptions) {
  if (!userOptions) return

  if (userOptions.logLevel) return userOptions.logLevel

  if (userOptions.verbose) return log.verbose

  if (userOptions.dryRun) return log.info

  if (userOptions.silent || userOptions.quiet) return log.silent
}
