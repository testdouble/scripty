var _ = require('lodash')

module.exports = function loadOption (name) {
  var env = process.env['SCRIPTY_' + _.snakeCase(name).toUpperCase()]

  if (env === 'true') return true
  if (env === 'false') return false
  if (env) return env

  var pkg = process.env['npm_package_scripty_' + name]

  if (pkg === 'true') return true
  if (pkg === 'false') return false
  if (pkg) return pkg
}
