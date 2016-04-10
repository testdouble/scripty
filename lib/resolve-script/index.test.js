if (UNSUPPORTED_TDD) return

var path = require('path')

module.exports = {
  beforeEach: function () {
    td.when(td.replace(process, 'cwd')()).thenReturn('/user-dir')
    this.generateGlob = td.replace('./generate-glob')
    this.findExecutables = td.replace('./find-executables')
    this.subject = require('./index')

    this.scriptsDir = path.resolve(__dirname, '../../scripts')
    td.when(this.generateGlob('/user-dir/scripts', 'fake')).thenReturn('glob1')
    td.when(this.generateGlob(this.scriptsDir, 'fake')).thenReturn('glob2')
  },
  bothUserAndBuiltInScriptsExist: function (done) {
    td.when(this.findExecutables('glob1')).thenCallback(null, ['user-path'])
    td.when(this.findExecutables('glob2')).thenCallback(null, ['pathA'])

    this.subject('fake', {}, function (er, result) {
      assert.deepEqual(result, ['user-path'])
      done(er)
    })
  },
  oneBuiltInScriptExists: function (done) {
    td.when(this.findExecutables('glob1')).thenCallback(null, [])
    td.when(this.findExecutables('glob2')).thenCallback(null, ['pathA'])

    this.subject('fake', {}, function (er, result) {
      assert.deepEqual(result, ['pathA'])
      done(er)
    })
  },
  noScriptExists: function (done) {
    td.when(this.findExecutables('glob1')).thenCallback(null, [])
    td.when(this.findExecutables('glob2')).thenCallback(null, [])

    this.subject('fake', {}, function (er, result) {
      assert.equal(er.message,
        'Error: scripty - no script found for npm lifecycle "fake" matching ' +
        'either "glob1" or "glob2". Either define a script or remove ' +
        '"scripty" from "fake" under "scripts" in your package.json.'
      )
      assert.equal(result, null)
      done(null)
    })
  }
}
