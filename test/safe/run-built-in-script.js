var scripty = require('../../index')
var grabStdio = require('../grab-stdio')
var _ = require('lodash')
var path = require('path')

module.exports = {
  outputAndRunScript: function (done) {
    var stdio = {}
    scripty('hello:world', {
      resolve: {
        builtIn: path.resolve('test/fixtures/built-in-scripts'),
        scripts: path.resolve('test/fixtures/user-scripts'),
      },
      spawn: {
        tap: grabStdio(stdio)
      }
    }, function (er, code) {
      assert.equal(0, code)
      assert.includes(stdio.stdout, '> echo Hello, $WORLD!')
      assert.includes(stdio.stdout, 'Hello, World!')

      done(er)
    })
  },
  noScriptFound: function (done) {
    done('nope')
  }
}
