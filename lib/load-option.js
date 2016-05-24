var _ = require('lodash')

module.exports = function loadOption (name) {
  var env = process.env['SCRIPTY_' + _.snakeCase(name).toUpperCase()]
  var pkg = process.env['npm_package_scripty_' + name]

  return env === 'true' || (env !== 'false' && pkg === 'true')
}
