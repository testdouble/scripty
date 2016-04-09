var spawn = require('child_process').spawn
var _ = require('lodash')

var resolveScript = require('./lib/resolve-script')
var printScript = require('./lib/print-script')

module.exports = function (npmLifecycle, options, cb) {
  if (typeof options === 'function') cb = options, options = {}
  resolveScript(npmLifecycle, options.resolve, function (er, scriptFile) {
    if (er) { cb(er) }
    printScript(scriptFile)
    var child = spawn(scriptFile, options.spawn)
    child.on('close', function (code) {
      cb(null, code)
    })
    if (_.property(options, 'spawn.tap')) { options.spawn.tap(child) }
  })
}
