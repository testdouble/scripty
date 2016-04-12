var generateGlob = require('./generate-glob')
var findExecutables = require('./find-executables')
var scriptDirs = require('./script-dirs')

module.exports = function (name, options, cb) {
  var dirs = scriptDirs(options)
  var userGlob = generateGlob(dirs.userDir, name)
  findExecutables(userGlob, function (er, userPaths) {
    if (userPaths.length > 0) {
      cb(er, userPaths)
    } else {
      var ourGlob = generateGlob(dirs.ourDir, name)
      findExecutables(ourGlob, function (er, ourPaths) {
        if (ourPaths.length > 0) {
          cb(er, ourPaths)
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
