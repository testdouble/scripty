var _ = require('lodash')
var path = require('path')

var scripty = require('../index')
var grabStdio = require('./grab-stdio')

module.exports = function (name, opts, cb) {
  var stdio = {}

  scripty(name, _.extend({}, {
    resolve: {
      builtIn: path.resolve('test/fixtures/built-in-scripts'),
      scripts: path.resolve('test/fixtures/user-scripts')
    },
    spawn: {
      tap: grabStdio(stdio)
    }

  }, opts), function (er, code) {
    cb(er, code, stdio)
  })
}
