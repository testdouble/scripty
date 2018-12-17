var path = require('path')
var fs = require('fs')
var lodash = require('lodash')
var resolvePkg = require('resolve-pkg')

module.exports = function (options, platform) {
  platform = platform || process.platform
  var modules = lodash.get(options, 'modules', [])
  return {
    userDir: find(process.cwd(), options, 'scripts', platform),
    moduleDirs: findModulePaths(modules).map(function (path) { return find(path, options, 'scripts', platform) }),
    ourDir: find(path.resolve(__dirname, '../..'), options, 'builtIn', platform)
  }
}

function find (base, options, key, platform) {
  if (platform === 'win32' && options[key + 'Win']) {
    return options[key + 'Win']
  } else if (platform === 'win32' && fs.existsSync(path.resolve(base, 'scripts-win'))) {
    return path.resolve(base, 'scripts-win')
  } else if (platform === 'win32' && fs.existsSync(path.resolve(base, 'script-win'))) {
    return path.resolve(base, 'script-win')
  } else if (options[key]) {
    return options[key]
  } else if (fs.existsSync(path.resolve(base, 'scripts'))) {
    return path.resolve(base, 'scripts')
  } else {
    return path.resolve(base, 'script')
  }
}

function findModulePaths (modules) {
  var modulePaths = []

  modules.forEach(function (moduleName) {
    var modulePath = resolvePkg(moduleName)

    if (modulePath) {
      modulePaths.push(modulePath)
    }
  })

  return modulePaths
}
