var path = require('path')

var subject = require('./script-dirs')

module.exports = {
  optionSet: function () {
    assert.equal(subject({scripts: 'A'}).userDir, 'A')
    assert.equal(subject({builtIn: 'B'}).ourDir, 'B')
  },
  noOptionSet: function () {
    var dirName = process.platform === 'win32' ? 'scripts-win' : 'scripts'

    var result = subject({})

    assert.equal(result.userDir, path.resolve(process.cwd(), dirName))
    assert.equal(result.ourDir, path.resolve(__dirname, '../..', dirName))
  },
  onWindowsAndNoScriptsWinAssumesScripts: function () {
    if (process.platform !== 'win32') return
    td.when(td.replace(process, 'cwd')()).thenReturn(__dirname)

    var result = subject({})

    assert.equal(result.userDir, path.resolve(process.cwd(), 'scripts'))
  }
}
