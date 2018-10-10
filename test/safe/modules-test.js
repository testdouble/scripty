var fork = require('child_process').fork
var path = require('path')
var grabStdio = require('../grab-stdio')

module.exports = {
  runScriptFromModule: function (done) {
    var stdio = {}
    var child = fork('../../../cli', [], {
      cwd: path.join(__dirname, '..', 'fixtures', 'modules'),
      silent: true,
      env: {
        npm_lifecycle_event: 'foo',
        npm_package_scripty_modules_0: 'foo',
        SCRIPTY_SILENT: true
      }
    })

    grabStdio(stdio)(child)

    child.on('exit', function (code) {
      assert.equal(code, 0)
      if (process.platform === 'win32') {
        assert.includes(stdio.stdout, 'Hello, World! from foo win')
      } else {
        assert.includes(stdio.stdout, 'Hello, World! from foo')
      }

      done()
    })
  },
  userScriptTakesPriorityOverModule: function (done) {
    var stdio = {}
    var child = fork('../../../cli', [], {
      cwd: path.join(__dirname, '..', 'fixtures', 'modules'),
      silent: true,
      env: {
        npm_lifecycle_event: 'user',
        npm_package_scripty_modules_0: 'foo',
        SCRIPTY_SILENT: true
      }
    })

    grabStdio(stdio)(child)

    child.on('exit', function (code) {
      assert.equal(code, 0)
      if (process.platform === 'win32') {
        assert.includes(stdio.stdout, 'Hello, World! from user win')
      } else {
        assert.includes(stdio.stdout, 'Hello, World! from user')
      }

      done()
    })
  }
}
