var path = require('path')
var fs = require('fs')

module.exports = function (options) {
  return {
    userDir: findDir(process.cwd(), options.scripts),
    ourDir: findDir(path.resolve(__dirname, '../..'), options.builtIn)
  }
}

function findDir (base, custom) {
  if (custom) {
    return custom
  } else if (process.platform === 'win32' && fs.existsSync(path.resolve(base, 'scripts-win'))) {
    return path.resolve(base, 'scripts-win')
  } else {
    return path.resolve(base, 'scripts')
  }
}
