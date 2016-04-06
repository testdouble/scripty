var path = require('path')

module.exports = function (dir1, dir2) {
  return path.resolve(dir1, dir2) + '/*'
}
