var path = require('path')
var fs = require('fs')

module.exports = function (dir1, dir2) {
  var expanded = path.resolve(dir1, dir2.replace(/\:/g, '/'))
  if (isDir(expanded)) {
    if (containsIndexFile(expanded)) {
      return expanded + '/index*'
    } else {
      return expanded + '/*'
    }
  } else {
    return expanded + '*'
  }
}

function isDir (f) {
  try {
    return fs.statSync(f).isDirectory()
  } catch (e) {}
}

function containsIndexFile (f) {
  try {
    return fs.statSync(f + '/index').isFile()
  } catch (e) {}
}
