var spawn = require('child_process').spawn
var _ = require('lodash')
var async = require('async')

var optionalOptionWrapper = require('./optional-option-wrapper')
var resolveScript = require('./resolve-script')
var printScript = require('./print-script')
var logger = require('./log')

module.exports = optionalOptionWrapper(function scripty (npmLifecycle, options, cb) {
  var asyncOperation = async[options.parallel ? 'parallel' : 'series']
  resolveScript(npmLifecycle, options.resolve, function (er, scriptFiles) {
    if (er) { return cb(er) }
    if (options.dryRun) {
      logger('This is a dry run. Executed scripts would be:\n')
      logger(scriptFiles)
      return cb(null, 0)
    }
    asyncOperation(wrapScriptRunners(scriptFiles, options), function (er, codes) {
      cb(er, _.last(codes))
    })
  })
}, {
  userArgs: [],
  parallel: false,
  dryRun: false,
  spawn: {},
  resolve: {}
})

function wrapScriptRunners (scriptFiles, options) {
  return _.map(scriptFiles, function (scriptFile) {
    return function (cb) {
      runScript(scriptFile, options, cb)
    }
  })
}

function runScript (scriptFile, options, cb) {
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
