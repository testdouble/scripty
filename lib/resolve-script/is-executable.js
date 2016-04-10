var fs = require('fs')

OTHERS = parseInt('0001', 8)
GROUP = parseInt('0010', 8)
USER = parseInt('0100', 8)

module.exports = function (path, cb) {
  fs.stat(path, function (er, stats) {
    if (er) return cb(er)
    cb(er,
      stats.mode & OTHERS ||
      (stats.mode & GROUP && process.getgid() === stats.gid) ||
      (stats.mode & USER && process.getuid() === stats.uid)
    )
  })
}
