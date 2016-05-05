var optionify = require('./optionify')
var resolveScript = require('./resolve-script')
var run = require('./run')

module.exports = optionify(function scripty (npmLifecycle, options, cb) {
  resolveScript(npmLifecycle, options.resolve, function (er, scriptFiles) {
    if (er) return cb(er)
    run(scriptFiles, options, cb)
  })
}, {
  userArgs: [],
  parallel: false,
  dryRun: false,
  silent: false,
  spawn: {},
  resolve: {}
})
