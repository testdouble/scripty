var _ = require('lodash')
var path = require('path')

module.exports = function (dir1, name) {
  var relative = name ? path.join.apply(this, name.split(':')) : ''
  var expanded = path.resolve(dir1, relative)

  return _.compact([
    // exact file match (+ any same-named extensions)
    name ? {pattern: expanded + '?(.*)', nodir: true} : undefined,
    // a nested index file match (+ any same-named extensions)
    {pattern: path.join(expanded, 'index?(.*)'), nodir: true},
    // any nested files at all
    {pattern: path.join(expanded, '*')}
  ])
}
