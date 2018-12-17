var path = require('path')

function cd (dir) {
  td.when(td.replace(process, 'cwd')()).thenReturn(dir)
}

module.exports = {
  beforeEach: function () {
    this.resolvePkg = td.replace('resolve-pkg')
    this.subject = require('./script-dirs')
  },
  unixUserScripts: {
    'prefer scripts key if set': function () {
      cd(path.resolve('test/fixtures/scripts-to-rule-them-all/with-all'))

      assert.equal(this.subject({ scripts: 'A', scriptsWin: 'B' }, 'lolnix').userDir, 'A')
    },

    'first fallback to scripts if it exists': function () {
      cd(path.resolve('test/fixtures/scripts-to-rule-them-all/with-all'))

      assert.equal(this.subject({ scripts: null, scriptsWin: 'B' }, 'lolnix').userDir,
        path.resolve(process.cwd(), 'scripts'))
    },

    'final fallback to script': function () {
      cd(__dirname)
      assert.equal(this.subject({ scripts: null, scriptsWin: null }, 'lolnix').userDir,
        path.resolve(process.cwd(), 'script'))
    }
  },
  unixBuiltInScripts: function () {
    assert.equal(this.subject({ builtIn: 'A', builtInWin: 'B' }, 'lolnix').ourDir, 'A')
    assert.equal(this.subject({ builtIn: null, builtInWin: 'B' }, 'lolnix').ourDir,
      path.resolve(__dirname, '../../scripts'))
  },
  windowsUserScripts: {
    'prefer scriptsWin value if set': function () {
      cd(path.resolve('test/fixtures/scripts-to-rule-them-all', 'with-all'))

      assert.equal(this.subject({ scripts: 'A', scriptsWin: 'B' }, 'win32').userDir, 'B')
    },

    'first fallback to scripts-win if exists': function () {
      cd(path.resolve('test/fixtures/scripts-to-rule-them-all', 'with-all'))

      assert.equal(this.subject({ scripts: 'A', scriptsWin: null }, 'win32').userDir,
        path.resolve(process.cwd(), 'scripts-win'))
    },

    'second fallback to script-win if it exists': function () {
      cd(path.resolve('test/fixtures/scripts-to-rule-them-all/no-scripts-win'))

      assert.equal(this.subject({ scripts: 'A', scriptsWin: null }, 'win32').userDir,
        path.resolve(process.cwd(), 'script-win'))
    },

    'third fallback to scripts key if set': function () {
      cd(path.resolve('test/fixtures/scripts-to-rule-them-all/no-win'))

      assert.equal(this.subject({ scripts: 'A', scriptsWin: null }, 'win32').userDir, 'A')
    },

    'fourth fallback to scripts if it exists': function () {
      cd(path.resolve('test/fixtures/scripts-to-rule-them-all/no-win'))

      assert.equal(this.subject({ scripts: null, scriptsWin: null }, 'win32').userDir,
        path.resolve(process.cwd(), 'scripts'))
    },

    'final fallback to script': function () {
      cd(__dirname)
      assert.equal(this.subject({ scripts: null, scriptsWin: null }, 'win32').userDir,
        path.resolve(process.cwd(), 'script'))
    }
  },
  windowsBuiltIn: function () {
    assert.equal(this.subject({ builtIn: 'A', builtInWin: 'B' }, 'win32').ourDir, 'B')
    assert.equal(this.subject({ builtIn: 'A', builtInWin: null }, 'win32').ourDir,
      path.resolve(__dirname, '../../scripts-win'))
  },
  moduleDirs: function () {
    td.when(this.resolvePkg('bar')).thenReturn('node_modules/bar')

    assert.deepEqual(
      this.subject({
        modules: ['bar']
      },
      'lolnix'
      ).moduleDirs, [path.resolve(process.cwd(), 'node_modules/bar/script')]
    )
  }
}
