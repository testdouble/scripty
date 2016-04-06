var spawn = require('child_process').spawn
var resolveScript = require('./lib/resolve-script')

module.exports = function (npmLifecycle) {
  var scriptFile = require('path').resolve(__dirname, resolveScript(npmLifecycle))
  var script = spawn(scriptFile, {
    cwd: process.cwd(),
    stdio: 'inherit'
  })

  script.on('exit', function (code) {
    process.exit(code)
  })
}
