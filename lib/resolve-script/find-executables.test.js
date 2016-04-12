var fs = require('fs')
var path = require('path')
var exec = require('child_process').exec

module.exports = {
  beforeEach: function () {
    td.replace(console, 'warn')
    this.foo1 = path.join(__dirname, 'foo')
    this.foo2 = path.join(__dirname, 'foo.lol')
    this.subject = require('./find-executables')
  },
  afterEach: function () {
    [this.foo1, this.foo2].forEach(function (f) {
      try {
        fs.unlinkSync(f)
      } catch (e) {}
    })
  },
  noFilesFound: function (done) {
    this.subject(path.resolve(__dirname, 'foo*'), function (er, result) {
      assert.deepEqual(result, [])
      done(er)
    })
  },
  oneFileFound: function (done) {
    fs.writeFileSync(this.foo1, 'hi')
    exec('chmod +x "' + this.foo1 + '"', function () {
      this.subject(path.resolve(__dirname, 'foo*'), function (er, result) {
        assert.deepEqual(result, [this.foo1])
        done(er)
      }.bind(this))
    }.bind(this))
  },
  oneFileFoundWithOneNonExecutable: function (done) {
    if (process.platform === 'win32') return done()
    fs.writeFileSync(this.foo1, 'hi')
    fs.writeFileSync(this.foo2, 'hi')
    exec('chmod +x "' + this.foo1 + '"', function () {
      this.subject(path.resolve(__dirname, 'foo*'), function (er, result) {
        assert.deepEqual(result, [this.foo1])
        td.verify(console.warn(
          'Warning: scripty - ignoring script "' + this.foo2 + '" because it' +
          ' was not executable. Run `chmod +x "' + this.foo2 + '" if you want' +
          ' scripty to run it.'
        ))
        done(er)
      }.bind(this))
    }.bind(this))
  },
  twoFilesFound: function (done) {
    fs.writeFileSync(this.foo1, 'hi')
    fs.writeFileSync(this.foo2, 'hi')

    exec('chmod +x "' + this.foo1 + '" "' + this.foo2 + '"', function () {
      this.subject(path.resolve(__dirname, 'foo*'), function (er, result) {
        assert.deepEqual(result, [this.foo1, this.foo2])
        done(er)
      }.bind(this))
    }.bind(this))
  }
}

if (UNSUPPORTED_TDD) module.exports = {}
