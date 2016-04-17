var path = require('path')
var fs = require('fs')

module.exports = function (options, platform) {
  platform = platform || process.platform
  return {
    userDir: find(process.cwd(), options, 'scripts', platform),
    ourDir: find(path.resolve(__dirname, '../..'), options, 'builtIn', platform)
  }
}

function find (base, options, key, platform) {
  if (platform === 'win32' && options[key + 'Win']) {
    return options[key + 'Win']
  } else if (platform === 'win32' && fs.existsSync(path.resolve(base, 'scripts-win'))) {
    return path.resolve(base, 'scripts-win')
  } else if (options[key]) {
    return options[key]
  } else {
    return path.resolve(base, 'scripts')
  }
}
