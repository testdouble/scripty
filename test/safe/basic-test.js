var path = require('path')

var scripty = require('../../index')
var grabStdio = require('../grab-stdio')
var log = require('../../lib/log')

var stdio, spawnTapper
module.exports = {
  beforeEach: function () {
    stdio = {}
    spawnTapper = grabStdio(stdio)
  },
  outputAndRunScript: function (done) {
    scripty('hello:world', {
      resolve: {
        builtIn: path.resolve('test/fixtures/built-in-scripts'),
        scripts: path.resolve('test/fixtures/user-scripts')
      },
      spawn: {
        tap: spawnTapper
      }
    }, function (er, code) {
      assert.equal(0, code)
      assert.includes(log.read(), '> echo "Hello, $WORLD!"')
      assert.includes(stdio.stdout, 'Hello, World!')

      done(er)
    })
  },
  noScriptFound: function (done) {
    scripty('not:a:real:thing', {
      spawn: {
        tap: spawnTapper
      }
    }, function (er, code) {
      assert.notEqual(0, code)
      assert.includes(er.message,
        'Error: scripty - no script found for npm lifecycle "not:a:real:thing"'
      )

      done(null)
    })
  },
  scriptFoundButFailed: function (done) {
    scripty('fail', {
      resolve: {
        builtIn: path.resolve('test/fixtures/built-in-scripts'),
        scripts: path.resolve('test/fixtures/user-scripts')
      },
      spawn: {
        tap: spawnTapper
      }
    }, function (er, code) {
      assert.notEqual(0, code)
      assert.includes(log.read(),
        'Error: scripty - script "fail" failed by exiting ' +
        'with a non-zero code (' + code + ').'
      )
      assert.includes(stdio.stderr,
        'cat: /silly/nonsense: No such file or directory'
      )
      done(er)
    })
  }
}
