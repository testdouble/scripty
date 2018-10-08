var path = require('path')
var lodash = require('lodash')
var resolvePkg = require('resolve-pkg')

module.exports = function (dir1, dir2, options) {
  var scriptPath = path.join.apply(this, dir2.split(':'))
  var expanded = path.resolve(dir1, scriptPath)
  var modules = lodash.get(options, 'modules', [])

  return [
    // exact file match (+ any same-named extensions)
    expanded + '+(|.*)',
    // a nested index file match (+ any same-named extensions)
    path.join(expanded, 'index+(|.*)'),
    // any nested files at all
    path.join(expanded, '*')
  ].concat(globsForModules(modules, scriptPath))
}

function globsForModules (modules, scriptPath) {
  var globArray = []

  modules.forEach(function (moduleName) {
    var modulePath = resolvePkg(moduleName + '/scripts')

    if (modulePath) {
      var moduleLocation = path.resolve(modulePath, scriptPath)

      globArray.push(moduleLocation + '+(|.*)')
      globArray.push(path.join(moduleLocation, 'index+(|.*)'))
      globArray.push(path.join(moduleLocation, '*'))
    }
  })

  return globArray
}
