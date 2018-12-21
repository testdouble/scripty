var globPatterns = require('./glob-patterns')
var findExecutables = require('./find-executables')
var scriptDirs = require('./script-dirs')

module.exports = function (name, options, cb) {
  var dirs = scriptDirs(options)
  var userGlob = globPatterns(dirs.userDir, name, dirs.moduleDirs)
  findExecutables(userGlob, function (er, userPaths) {
    if (userPaths.length > 0) {
      cb(er, userPaths)
    } else {
      var ourGlob = globPatterns(dirs.ourDir, name, [])
      findExecutables(ourGlob, function (er, ourPaths) {
        if (ourPaths.length > 0) {
          cb(er, ourPaths)
        } else {
          cb(new Error(`No script found for npm lifecycle '${name}' matching any of:\n` +
            `  ${String(userGlob).replace(/,/g, '\n  ')}\n` +
            `  ${String(ourGlob).replace(/,/g, '\n  ')}\n` +
            `Either define a script or remove "scripty" from 'scripts.${name}' in your package.json.`
          ), null)
        }
      })
    }
  })
}
