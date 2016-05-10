var _ = require('lodash')
var printScript = require('./print-script')
var spawn = require('child_process').spawn

module.exports = function (scriptFile, options, cb) {
  if (!options.silent) printScript(scriptFile)
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

