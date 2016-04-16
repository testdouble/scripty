var OPTIONS = { panda: true }

module.exports = {
  beforeEach: function () {
    td.when(td.replace(process, 'cwd')()).thenReturn('/user-dir')
    this.globPatterns = td.replace('./glob-patterns')
    this.findExecutables = td.replace('./find-executables')
    this.scriptDirs = td.replace('./script-dirs')
    this.subject = require('./index')

    td.when(this.scriptDirs(OPTIONS)).thenReturn({userDir: 'A', ourDir: 'B'})
    td.when(this.globPatterns('A', 'fake')).thenReturn(['glob1'])
    td.when(this.globPatterns('B', 'fake')).thenReturn(['glob2'])
  },
  bothUserAndBuiltInScriptsExist: function (done) {
    td.when(this.findExecutables(['glob1'])).thenCallback(null, ['user-path'])
    td.when(this.findExecutables(['glob2'])).thenCallback(null, ['pathA'])

    this.subject('fake', OPTIONS, function (er, result) {
      assert.deepEqual(result, ['user-path'])
      done(er)
    })
  },
  oneBuiltInScriptExists: function (done) {
    td.when(this.findExecutables(['glob1'])).thenCallback(null, [])
    td.when(this.findExecutables(['glob2'])).thenCallback(null, ['pathA'])

    this.subject('fake', OPTIONS, function (er, result) {
      assert.deepEqual(result, ['pathA'])
      done(er)
    })
  },
  noScriptExists: function (done) {
    td.when(this.findExecutables(['glob1'])).thenCallback(null, [])
    td.when(this.findExecutables(['glob2'])).thenCallback(null, [])

    this.subject('fake', OPTIONS, function (er, result) {
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

if (UNSUPPORTED_TDD) module.exports = {}
