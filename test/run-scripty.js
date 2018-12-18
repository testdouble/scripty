var _ = require('lodash')
var path = require('path')

var scripty = require('../lib/scripty')
var grabStdio = require('./grab-stdio')
var logLevel = require('../lib/run/log').levels

module.exports = function (name, opts, cb) {
  var stdio = {}

  scripty(name, _.defaultsDeep({}, opts, {
    logLevel: logLevel.SILENT,
    resolve: {
      builtIn: path.resolve('test/fixtures/built-in-scripts'),
      builtInWin: path.resolve('test/fixtures/built-in-scripts-win'),
      scripts: path.resolve('test/fixtures/user-scripts'),
      scriptsWin: path.resolve('test/fixtures/user-scripts-win')
    },
    spawn: {
      tap: grabStdio(stdio)
    }
  }), function (er, code) {
    cb(er, code, stdio)
  })
}
