var spawn = require('child_process').spawn
var _ = require('lodash')
var async = require('async')

var resolveScript = require('./lib/resolve-script')
var printScript = require('./lib/print-script')

module.exports = function (npmLifecycle, options, cb) {
  if (typeof options === 'function') cb = options
  options = options || {}

  resolveScript(npmLifecycle, options.resolve || {}, function (er, scriptFiles) {
    if (er) { return cb(er) }
    async.series(_.map(scriptFiles, function (f) {
      return spawnWrapper(options, f)
    }), function (er, codes) {
      cb(er, _.last(codes))
    })
  })
}

var spawnWrapper = function (options, scriptFile) {
  return function (cb) {
    printScript(scriptFile)
    var userArgs = options.userArgs || process.argv.slice(2)
    var child = spawn(scriptFile, userArgs, options.spawn)
    child.on('close', function (code) {
      if (code !== 0) {
        cb(new Error(
          'Error: scripty - script "fail" failed by exiting ' +
          'with a non-zero code (' + code + ').'
        ), code)
      } else {
        cb(null, code)
      }
    })
    _.invoke(options, 'spawn.tap', child)
  }
}
