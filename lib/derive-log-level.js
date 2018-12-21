const log = require('./log')

const npmLevel = {
  silent: log.silent,
  error: log.error,
  warn: log.warn,
  notice: log.info,
  http: log.info,
  timing: log.info,
  info: log.info,
  verbose: log.verbose,
  silly: log.verbose
}

module.exports = function deriveLogLevel (userOptions = {}) {
  if (userOptions.logLevel) return userOptions.logLevel

  if (userOptions.verbose) return log.verbose

  if (userOptions.dryRun) return log.info

  if (userOptions.silent || userOptions.quiet) return log.silent

  return npmLevel[process.env.npm_config_loglevel]
}
