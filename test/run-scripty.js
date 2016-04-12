var _ = require('lodash')
var path = require('path')

var scripty = require('../index')
var grabStdio = require('./grab-stdio')

var builtInPath, userPath
if (process.platform === 'win32') {
  builtInPath = path.resolve('test/fixtures/built-in-scripts-win')
  userPath = path.resolve('test/fixtures/user-scripts-win')
} else {
  builtInPath = path.resolve('test/fixtures/built-in-scripts')
  userPath = path.resolve('test/fixtures/user-scripts')
}

module.exports = function (name, opts, cb) {
  var stdio = {}

  scripty(name, _.extend({}, {
    resolve: {
      builtIn: builtInPath,
      scripts: userPath
    },
    spawn: {
      tap: grabStdio(stdio)
    }

  }, opts), function (er, code) {
    cb(er, code, stdio)
  })
}
