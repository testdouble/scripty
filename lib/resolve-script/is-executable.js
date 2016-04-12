var fs = require('fs')

module.exports = function (path, cb) {
  if (process.platform === 'win32') return cb(null, true)
  fs.stat(path, function (er, stats) {
    if (er) return cb(er)
    var mode = stats.mode

    var owner = mode >> 6
    var group = (mode << 3) >> 6
    var others = (mode << 6) >> 6

    cb(er, !!(owner & 1) || !!(group & 1) || !!(others & 1))
  })
}
