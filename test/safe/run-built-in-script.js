var scripty = require('../../index')
var fs = require('fs')
var intercept = require('intercept-stdout')
var assert = require('assert')
var _ = require('lodash')

var stdout, stopIntercept
module.exports = {
  beforeEach: function () {
    stdout = ''
    stopIntercept = intercept(function (text) {
      stdout += text
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
  afterEach: function () {
    stopIntercept()
  }
}
