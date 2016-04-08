var scripty = require('../../index')
var fs = require('fs')
var exec = require('child_process').exec
var assert = require('assert')
var _ = require('lodash')
var stream = require('stream')

var stdout, stdoutText, stderr, stderrText, stopIntercept
module.exports = {
  beforeEach: function () {
    stdout = new stream.Duplex()
    stdout._read = function () {}
    stdoutText = ''
    stdout.on('data', function (text) {
      stdoutText += text
    })
    stderr = new stream.Duplex()
    stderr._read = function () {}
    stderrText = ''
    stderr.on('data', function (text) {
      stderrText += text
    })
  },
  outputAndRunScript: function (done) {
    fs.writeFileSync('scripts/fake/helloworld',
      '#!/bin/bash\n' +
      'WORLD="World"\n' +
      'echo "Hello, $WORLD!"'
    )
    exec('chmod +x "scripts/fake/helloworld"', function () {
      scripty('fake:helloworld', {
        stdio: [process.stdin, stdout, stderr]
      }, function (er, code) {
        assert.equal(0, code)
        assert(_.includes(stdoutText, '> echo Hello, $WORLD!'), 'prints script')
        assert(_.includes(stdoutText, 'Hello, World!'), 'prints output')

        done(er)
      })
    })
  },
  noScriptFound: function (done) {
    scripty('fake:noscriptfound', {
      stdio: [process.stdin, stdout, stderr]
    }, function (er, code) {
      assert.notEqual(code, 0)
      assert(_.includes(stderrText,
        'Error: scripty - no script found for npm lifecycle "fake:noscriptfound"'
      ))

      done()
    })

  }
}
