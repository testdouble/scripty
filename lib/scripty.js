var optionify = require('./optionify')
var resolveScript = require('./resolve-script')
var run = require('./run')
var log = require('./log')

module.exports = optionify(function scripty (npmLifecycle, options, cb) {
  log.level = options.logLevel

  resolveScript(npmLifecycle, options.resolve, function (er, scriptFiles) {
    if (er) return cb(er)
    run(scriptFiles, options, cb)
  })
}, {
  userArgs: [],
  parallel: false,
  dryRun: false,
  logLevel: 'info',
  spawn: {},
  resolve: {}
})
