var async = require('async')

module.exports = function (commands, parallel, cb) {
  var runner = async[parallel ? 'parallel' : 'series']
  runner(commands, cb)
}
