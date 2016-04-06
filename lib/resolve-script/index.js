var path = require('path')

var generateGlob = require('./generate-glob')
var findExecutables = require('./find-executables')
var determineScript = require('./determine-script')

module.exports = function (name, cb) {
  var userDir = path.resolve(process.cwd(), 'scripts')
  var userGlob = generateGlob(userDir, name)
  findExecutables(userGlob, function (er, userPaths) {
    var userPath = determineScript(userPaths)
    if (userPath) {
      cb(er, userPath)
    } else {
      var ourDir = path.resolve(__dirname, '../../scripts')
      var ourGlob = generateGlob(ourDir, name)
      findExecutables(ourGlob, function (er, ourPaths) {
        var ourPath = determineScript(ourPaths)
        if (ourPath) {
          cb(er, ourPath)
        } else {
          cb(new Error(
            'Error: scripty - no script found for npm lifecycle "' + name + '"' +
            ' matching either "' + userGlob + '" or "' + ourGlob + '". Either' +
            ' define a script or remove "scripty" from "' + name + '" under' +
            ' "scripts" in your package.json.'
          ), null)
        }
      })
    }
  })
}
