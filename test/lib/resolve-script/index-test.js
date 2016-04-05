var root = '../../../lib/resolve-script'
var path = require('path')

module.exports = {
  beforeEach: function () {
    this.generateGlob = td.replace(root + '/generate-glob')
    this.findExecutables = td.replace(root + '/find-executables')
    this.determineScript = td.replace(root + '/determine-script')
    this.subject = require(root + '/index')
  },
  oneBuiltInScriptExists: function (done) {
    scriptsDir = path.resolve(__dirname, '../../../scripts')
    td.when(this.generateGlob(scriptsDir, 'fake')).thenReturn('glob')
    td.when(this.findExecutables('glob')).thenCallback(null, ['pathA'])
    td.when(this.determineScript(['pathA'])).thenReturn('path/to/fake')

    this.subject('fake', function (er, result) {
      assert.equal(result, 'path/to/fake')
      done(er)
    })
  }
}
