var path = require('path')

module.exports = function (dir1, dir2) {
  var expanded = path.resolve(dir1, path.join.apply(this, dir2.split(':')))

  return [
    // exact file match (+ any same-named extensions)
    expanded + '+(|.*)',
    // a nested index file match (+ any same-named extensions)
    path.join(expanded, 'index+(|.*)'),
    // any nested files at all
    path.join(expanded, '*')
  ]
}
