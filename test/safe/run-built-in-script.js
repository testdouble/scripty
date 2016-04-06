var scripty = require('../../index')
var fs = require('fs')
var intercept = require('intercept-stdout')
var assert = require('assert')
var _ = require('lodash')

var stdout, stderr, stopIntercept
module.exports = {
  beforeEach: function () {
    stdout = ''
    stderr = ''
    stopIntercept = intercept(function (text) {
      stdout += text
    }, function (text) {
      stderr += text
    })
  },
  outputAndRunScript: function () {
    fs.writeFileSync('scripts/fake/helloworld',
      '#!/bin/bash\n' +
      'WORLD="World"\n' +
      'echo "Hello, $WORLD!"'
    )

    scripty('fake:helloworld')

    assert(_.includes(stdout, '> echo Hello, $WORLD!'), 'prints script')
    assert(_.includes(stdout, 'Hello, World!'), 'prints output')
  },
  noScriptFound: function () {
    scripty('fake:noscriptfound')

    assert(_.includes(stderr,
      'Error: scripty - no script found for npm lifecycle "fake:noscriptfound"'
    ))
  },
  afterEach: function () {
    stopIntercept()
  }
}
