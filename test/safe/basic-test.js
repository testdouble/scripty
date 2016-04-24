var runScripty = require('../run-scripty')
var log = require('../../lib/run/log')

module.exports = {
  outputAndRunScript: function (done) {
    runScripty('hello:world', {}, function (er, code, stdio) {
      assert.equal(0, code)
      if (process.platform === 'win32') {
        assert.includes(log.read(), '> ECHO Hello, %WORLD%!')
      } else {
        assert.includes(log.read(), '> echo "Hello, $WORLD!')
      }
      assert.includes(stdio.stdout, 'Hello, World!')

      done(er)
    })
  },
  noScriptFound: function (done) {
    runScripty('not:a:real:thing', {}, function (er, code, stdio) {
      assert.notEqual(0, code)
      assert.includes(er.message,
        'Error: scripty - no script found for npm lifecycle "not:a:real:thing"'
      )

      done(null)
    })
  },
  scriptFoundButFailed: function (done) {
    runScripty('fail', {}, function (er, code, stdio) {
      assert.notEqual(0, code)
      assert.includes(er.message,
        'Error: scripty - script "fail" failed by exiting ' +
        'with a non-zero code (' + code + ').'
      )
      if (process.platform === 'win32') {
        assert.includes(stdio.stderr, 'The system cannot find the path specified.')
      } else {
        assert.includes(stdio.stderr, 'cat: /silly/nonsense: No such file or directory')
      }
      done(null)
    })
  },
  passArgsToScript: function (done) {
    var options = {userArgs: ['--test', 'arg passed by user']}

    runScripty('args:echoer', options, function (er, code, stdio) {
      assert.includes(stdio.stdout, 'Your args were: --test "arg passed by user"')

      done(er)
    })
  }
}
