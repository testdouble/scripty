var path = require('path')

var subject = require('./script-dirs')

module.exports = {
  unixUserScripts: function () {
    assert.equal(subject({scripts: 'A', scriptsWin: 'B'}, 'lolnix').userDir, 'A')
    assert.equal(subject({scripts: null, scriptsWin: 'B'}, 'lolnix').userDir,
      path.resolve(process.cwd(), 'scripts'))
  },
  unixBuiltInScripts: function () {
    assert.equal(subject({builtIn: 'A', builtInWin: 'B'}, 'lolnix').ourDir, 'A')
    assert.equal(subject({builtIn: null, builtInWin: 'B'}, 'lolnix').ourDir,
      path.resolve(__dirname, '../../scripts'))
  },
  windowsUserScripts: function () {
    assert.equal(subject({scripts: 'A', scriptsWin: 'B'}, 'win32').userDir, 'B')
    assert.equal(subject({scripts: 'A', scriptsWin: null}, 'win32').userDir,
      path.resolve(process.cwd(), 'scripts-win'))
    // change dirs to any place that lacks a ./scripts-win dir
    td.when(td.replace(process, 'cwd')()).thenReturn(__dirname)
    assert.equal(subject({scripts: 'A', scriptsWin: null}, 'win32').userDir, 'A')
    assert.equal(subject({scripts: null, scriptsWin: null}, 'win32').userDir,
      path.resolve(process.cwd(), 'scripts'))
  },
  windowsBuiltIn: function () {
    assert.equal(subject({builtIn: 'A', builtInWin: 'B'}, 'win32').ourDir, 'B')
    assert.equal(subject({builtIn: 'A', builtInWin: null}, 'win32').ourDir,
      path.resolve(__dirname, '../../scripts-win'))
  }
}
