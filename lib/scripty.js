var spawn = require('child_process').spawn
var _ = require('lodash')
var async = require('async')

var optionalOptionWrapper = require('./optional-option-wrapper')
var resolveScript = require('./resolve-script')
var printScript = require('./print-script')

module.exports = optionalOptionWrapper(function scripty (npmLifecycle, options, cb) {
  resolveScript(npmLifecycle, options.resolve, function (er, scriptFiles) {
    if (er) { return cb(er) }
    async[options.parallel ? 'parallel' : 'series'](_.map(scriptFiles, function (f) {
      return spawnWrapper(options, f)
    }), function (er, codes) {
      cb(er, _.last(codes))
    })
  })
}, {
  userArgs: [],
  parallel: false,
  spawn: {},
  resolve: {}
})

function spawnWrapper (options, scriptFile) {
  return function (cb) {
    printScript(scriptFile)
    var userArgs = options.userArgs
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
