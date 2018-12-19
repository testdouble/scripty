var _ = require('lodash')

var dryRun = require('./dry-run')
var commandify = require('./commandify')
var spawnScript = require('./spawn-script')
var all = require('./all')

module.exports = function (scriptFiles, options, cb) {
  if (options.dryRun) return dryRun(scriptFiles, cb)

  var commands = commandify(spawnScript, scriptFiles, options)
  all(commands, options.parallel, function (er, codes) {
    cb(er, _.last(codes))
  })
}
