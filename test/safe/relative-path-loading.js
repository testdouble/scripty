var fork = require('child_process').fork
var path = require('path')
var grabStdio = require('../grab-stdio')

module.exports = {
  'loads scripts from a relative path': function (done) {
    var stdio = {}
    var windowsSuffix = process.platform === 'win32' ? '-win' : ''
    var child = fork('../../../cli', [], {
      cwd: path.join(__dirname, '..', 'fixtures', 'relative-path-loading'),
      silent: true,
      env: {
        npm_lifecycle_event: 'secret',
        npm_package_scripty_path: '../custom-user-scripts' + windowsSuffix,
        SCRIPTY_SILENT: true
      }
    })

    grabStdio(stdio)(child)

    child.on('exit', function (code) {
      assert.equal(code, 0)
      assert.includes(stdio.stdout, 'SSHHH')

      done()
    })
  }
}
