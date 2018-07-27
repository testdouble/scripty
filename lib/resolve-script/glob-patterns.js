var path = require('path')

module.exports = function (dir1, dir2) {
  var expanded = path.resolve(dir1, path.join.apply(this, dir2.split(':')))

  return [
    // exact file match (+ any same-named extensions)
    {pattern: expanded + '?(.*)', nodir: true},
    // a nested index file match (+ any same-named extensions)
    {pattern: path.join(expanded, 'index?(.*)'), nodir: true},
    // any nested files at all
    {pattern: path.join(expanded, '*')}
  ]
}
