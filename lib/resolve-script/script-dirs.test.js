var path = require('path')

module.exports = {
  beforeEach: function () {
    this.resolvePkg = td.replace('resolve-pkg')
    this.fsExistsSync = td.replace('fs').existsSync
    this.subject = require('./script-dirs')
  },
  unixUserScripts: {
    'prefer scripts key if set': function () {
      assert.equal(this.subject({ scripts: 'A', scriptsWin: 'B' }, 'lolnix').userDir, 'A')
    },

    'first fallback to scripts if it exists': function () {
      td.when(this.fsExistsSync(td.matchers.contains(/scripts$/))).thenReturn(true)
      assert.equal(this.subject({ scripts: null, scriptsWin: 'B' }, 'lolnix').userDir,
        path.resolve(process.cwd(), 'scripts'))
    },

    'final fallback to script': function () {
      td.when(this.fsExistsSync(td.matchers.contains(/scripts$/))).thenReturn(false)
      assert.equal(this.subject({ scripts: null, scriptsWin: null }, 'lolnix').userDir,
        path.resolve(process.cwd(), 'script'))
    }
  },
  unixBuiltInScripts: function () {
    td.when(this.fsExistsSync(td.matchers.contains(/scripts$/))).thenReturn(true)
    assert.equal(this.subject({ builtIn: 'A', builtInWin: 'B' }, 'lolnix').ourDir, 'A')
    assert.equal(this.subject({ builtIn: null, builtInWin: 'B' }, 'lolnix').ourDir,
      path.resolve(__dirname, '../../scripts'))
  },
  windowsUserScripts: {
    'prefer scriptsWin value if set': function () {
      assert.equal(this.subject({ scripts: 'A', scriptsWin: 'B' }, 'win32').userDir, 'B')
    },

    'first fallback to scripts-win if exists': function () {
      td.when(this.fsExistsSync(td.matchers.contains(/scripts-win$/))).thenReturn(true)
      assert.equal(this.subject({ scripts: 'A', scriptsWin: null }, 'win32').userDir,
        path.resolve(process.cwd(), 'scripts-win'))
    },

    'second fallback to script-win if it exists': function () {
      td.when(this.fsExistsSync(td.matchers.contains(/scripts-win$/))).thenReturn(false)
      td.when(this.fsExistsSync(td.matchers.contains(/script-win$/))).thenReturn(true)
      assert.equal(this.subject({ scripts: 'A', scriptsWin: null }, 'win32').userDir,
        path.resolve(process.cwd(), 'script-win'))
    },

    'third fallback to scripts key if set': function () {
      td.when(this.fsExistsSync(td.matchers.contains(/scripts-win$/))).thenReturn(false)
      td.when(this.fsExistsSync(td.matchers.contains(/script-win$/))).thenReturn(false)
      assert.equal(this.subject({ scripts: 'A', scriptsWin: null }, 'win32').userDir, 'A')
    },

    'fourth fallback to scripts if it exists': function () {
      td.when(this.fsExistsSync(td.matchers.contains(/scripts-win$/))).thenReturn(false)
      td.when(this.fsExistsSync(td.matchers.contains(/script-win$/))).thenReturn(false)
      td.when(this.fsExistsSync(td.matchers.contains(/scripts$/))).thenReturn(true)
      assert.equal(this.subject({ scripts: null, scriptsWin: null }, 'win32').userDir,
        path.resolve(process.cwd(), 'scripts'))
    },

    'final fallback to script': function () {
      td.when(this.fsExistsSync(td.matchers.contains(/scripts-win$/))).thenReturn(false)
      td.when(this.fsExistsSync(td.matchers.contains(/script-win$/))).thenReturn(false)
      td.when(this.fsExistsSync(td.matchers.contains(/scripts$/))).thenReturn(false)
      assert.equal(this.subject({ scripts: null, scriptsWin: null }, 'win32').userDir,
        path.resolve(process.cwd(), 'script'))
    }
  },
  windowsBuiltIn: function () {
    td.when(this.fsExistsSync(td.matchers.contains(/scripts-win$/))).thenReturn(true)
    assert.equal(this.subject({ builtIn: 'A', builtInWin: 'B' }, 'win32').ourDir, 'B')
    assert.equal(this.subject({ builtIn: 'A', builtInWin: null }, 'win32').ourDir,
      path.resolve(__dirname, '../../scripts-win'))
  },
  moduleDirs: {
    'prefer scripts if it exists': function () {
      td.when(this.resolvePkg('bar')).thenReturn('node_modules/bar')
      td.when(this.fsExistsSync(td.matchers.contains(/scripts$/))).thenReturn(true)

      assert.deepEqual(
        this.subject({
          modules: ['bar']
        },
        'lolnix'
        ).moduleDirs, [path.resolve(process.cwd(), 'node_modules/bar/scripts')]
      )
    },

    'fallback to script': function () {
      td.when(this.resolvePkg('bar')).thenReturn('node_modules/bar')
      td.when(this.fsExistsSync(td.matchers.contains(/scripts$/))).thenReturn(false)
      assert.deepEqual(
        this.subject({
          modules: ['bar']
        },
        'lolnix'
        ).moduleDirs, [path.resolve(process.cwd(), 'node_modules/bar/script')]
      )
    }
  }
}
