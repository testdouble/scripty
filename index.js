var spawn = require('child_process').spawn

var resolveScript = require('./lib/resolve-script')

module.exports = function (npmLifecycle, options, cb) {
  resolveScript(npmLifecycle, function (er, scriptFile) {
    if (er) { cb(er) }
    spawn(scriptFile, options).on('exit', function (code) {
      cb(null, code)
    })
  })
}
