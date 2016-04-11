var runScripty = require('../run-scripty')
var log = require('../../lib/log')

module.exports = {
  outputAndRunScript: function (done) {
    runScripty('hello:world', {}, function (er, code, stdio) {
      assert.equal(0, code)
      assert.includes(log.read(), '> echo "Hello, $WORLD!"')
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
      assert.includes(stdio.stderr,
        'cat: /silly/nonsense: No such file or directory'
      )
      done(null)
    })
  },
  passArgsToScript: function (done) {
    runScripty('args:echoer', {userArgs: ['--test', 'arg passed by user']}, function (er, code, stdio) {
      assert.includes(stdio.stdout, '--test arg passed by user')
    })
    done(null)
  }
}
