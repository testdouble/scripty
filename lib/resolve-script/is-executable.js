var fs = require('fs')

module.exports = function (path, cb) {
  fs.stat(path, function (er, stats) {
    var mode = stats.mode

    var owner = mode >> 6
    var group = (mode << 3) >> 6
    var others = (mode << 6) >> 6

    if (er) return cb(er)
    cb(er, !!(owner & 1) || !!(group & 1) || !!(others & 1))
  })
}
