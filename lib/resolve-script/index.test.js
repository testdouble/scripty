var path = require('path')

module.exports = {
  beforeEach: function () {
    this.generateGlob = td.replace('./generate-glob')
    this.findExecutables = td.replace('./find-executables')
    this.determineScript = td.replace('./determine-script')
    this.subject = require('./index')
  },
  oneBuiltInScriptExists: function (done) {
    var scriptsDir = path.resolve(__dirname, '../../scripts')
    td.when(this.generateGlob(scriptsDir, 'fake')).thenReturn('glob')
    td.when(this.findExecutables('glob')).thenCallback(null, ['pathA'])
    td.when(this.determineScript(['pathA'])).thenReturn('path/to/fake')

    this.subject('fake', function (er, result) {
      assert.equal(result, 'path/to/fake')
      done(er)
    })
  }
}
