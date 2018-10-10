var path = require('path')

module.exports = function (dir1, dir2, moduleDirs) {
  var globs = []
  var scriptPath = path.join.apply(this, dir2.split(':'))
  var searchSpaceDirs = [].concat(dir1, moduleDirs)

  searchSpaceDirs.forEach(function (dir) {
    var scriptDir = path.resolve(dir, scriptPath)

    // exact file match (+ any same-named extensions)
    globs.push(scriptDir + '+(|.*)')

    // a nested index file match (+ any same-named extensions)
    globs.push(path.join(scriptDir, 'index+(|.*)'))

    // any nested files at all
    globs.push(path.join(scriptDir, '*'))
  })

  return globs
}
