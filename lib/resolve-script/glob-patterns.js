var path = require('path')
var resolvePkg = require('resolve-pkg')

module.exports = function (dir1, dir2, options) {
  var expanded = path.resolve(dir1, path.join.apply(this, dir2.split(':')))

  var globArray = [
    // exact file match (+ any same-named extensions)
    expanded + '+(|.*)',
    // a nested index file match (+ any same-named extensions)
    path.join(expanded, 'index+(|.*)'),
    // any nested files at all
    path.join(expanded, '*')
  ]

  if (options && Array.isArray(options.modules)) {
    options.modules.forEach(function (moduleName) {
      const modulePath = resolvePkg(moduleName + '/scripts')

      if (modulePath) {
        var moduleLocation = path.resolve(modulePath, path.join.apply(this, dir2.split(':')))

        globArray.push(moduleLocation + '+(|.*)')
        globArray.push(path.join(moduleLocation, 'index+(|.*)'))
        globArray.push(path.join(moduleLocation, '*'))
      }
    })
  }

  return globArray
}
