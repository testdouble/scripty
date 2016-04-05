var spawn = require('child_process').spawn
var lifecycleToPath = require('./lib/lifecycle-to-path')

module.exports = function (npmLifecycle) {
  var scriptFile = require('path').resolve(__dirname, lifecycleToPath(npmLifecycle))
  var script = spawn(scriptFile, {
    cwd: process.cwd(),
    stdio: 'inherit'
  })

  script.on('exit', function (code) {
    process.exit(code)
  })
}
