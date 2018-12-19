var _ = require('lodash')
var printScript = require('./print-script')
var spawn = require('child_process').spawn

module.exports = function (scriptFile, options, cb) {
  printScript(scriptFile)

  const child = spawn(scriptFile, options.userArgs, options.spawn)

  child.on('close', code => cb(code !== 0
    ? new Error(`script failed: '${scriptFile}'\nexit status: ${code}`)
    : null, code)
  )

  _.invoke(options, 'spawn.tap', child)
}
