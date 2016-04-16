var fs = require('fs')
var path = require('path')
var _ = require('lodash')

var runScripty = require('../run-scripty')

module.exports = {
  beforeEach: teardown,
  afterEach: teardown,
  works: function (done) {
    runScripty('parallel', {parallel: true}, function (er, code, stdio) {
      assert.equal(0, code)
      assert.includes(stdio.stdout, 'Batter waits for ball')
      assert.includes(stdio.stdout, 'Pitcher writes ball')
      assert.includes(stdio.stdout, 'Batter sees ball')
      assert.includes(stdio.stdout, 'Pitcher waits for bat')
      assert.includes(stdio.stdout, 'Batter writes bat')
      assert.includes(stdio.stdout, 'Pitcher sees bat')
      done(er)
    })
  }
}

function teardown () {
  _(['bat', 'ball']).each(function (f) {
    try {
      fs.unlinkSync(path.resolve('test/fixtures/baseball', f))
    } catch (e) {}
  })
}
