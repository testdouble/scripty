var path = require('path')

module.exports = {
  beforeEach: function () {
    this.resolvePkg = td.replace('resolve-pkg')
    this.subject = require('./script-dirs')
  },
  unixUserScripts: function () {
    assert.equal(this.subject({scripts: 'A', scriptsWin: 'B'}, 'lolnix').userDir, 'A')
    assert.equal(this.subject({scripts: null, scriptsWin: 'B'}, 'lolnix').userDir,
      path.resolve(process.cwd(), 'scripts'))
  },
  unixBuiltInScripts: function () {
    assert.equal(this.subject({builtIn: 'A', builtInWin: 'B'}, 'lolnix').ourDir, 'A')
    assert.equal(this.subject({builtIn: null, builtInWin: 'B'}, 'lolnix').ourDir,
      path.resolve(__dirname, '../../scripts'))
  },
  windowsUserScripts: function () {
    assert.equal(this.subject({scripts: 'A', scriptsWin: 'B'}, 'win32').userDir, 'B')
    assert.equal(this.subject({scripts: 'A', scriptsWin: null}, 'win32').userDir,
      path.resolve(process.cwd(), 'scripts-win'))
    // change dirs to any place that lacks a ./scripts-win dir
    td.when(td.replace(process, 'cwd')()).thenReturn(__dirname)
    assert.equal(this.subject({scripts: 'A', scriptsWin: null}, 'win32').userDir, 'A')
    assert.equal(this.subject({scripts: null, scriptsWin: null}, 'win32').userDir,
      path.resolve(process.cwd(), 'scripts'))
  },
  windowsBuiltIn: function () {
    assert.equal(this.subject({builtIn: 'A', builtInWin: 'B'}, 'win32').ourDir, 'B')
    assert.equal(this.subject({builtIn: 'A', builtInWin: null}, 'win32').ourDir,
      path.resolve(__dirname, '../../scripts-win'))
  },
  moduleDirs: function () {
    td.when(this.resolvePkg('bar')).thenReturn('node_modules/bar')

    assert.deepEqual(
      this.subject({
        modules: ['bar']
      },
      'lolnix'
      ).moduleDirs, [path.resolve(process.cwd(), 'node_modules/bar/scripts')]
    )
  }
}
