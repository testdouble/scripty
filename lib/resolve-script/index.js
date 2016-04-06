var path = require('path')

var generateGlob = require('./generate-glob')
var findExecutables = require('./find-executables')
var determineScript = require('./determine-script')

module.exports = function (npmLifecycle, cb) {
  var builtInScriptsDir = path.resolve(__dirname, '../../scripts')
  console.log(builtInScriptsDir, generateGlob(builtInScriptsDir, npmLifecycle))
  findExecutables(generateGlob(builtInScriptsDir, npmLifecycle), function (er, paths) {
    cb(er, determineScript(paths))
  })
}
