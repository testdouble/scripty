var _ = require('lodash')

const commandify = (func, items, options) =>
  items.map(item => cb => func(item, options, cb))
var dryRun = require('./dry-run')
var spawnScript = require('./spawn-script')
var all = require('./all')

module.exports = function (scriptFiles, options, cb) {
  if (options.dryRun) return dryRun(scriptFiles, cb)

  var commands = commandify(spawnScript, scriptFiles, options)
  all(commands, options.parallel, function (er, codes) {
    cb(er, _.last(codes))
  })
}
