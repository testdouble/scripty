var runScripty = require('../run-scripty')

var lines = function (stdio) {
  return stdio.stdout.trim().split('\n')
}

module.exports = {
  runsIndexWhenDirIsFound: function (done) {
    runScripty('top', {}, function (er, code, stdio) {
      assert.equal(code, 0)
      assert.deepEqual(lines(stdio), ['rubby'])
      done(er)
    })
  },
  runAllWhenDirHasNoIndex: function (done) {
    runScripty('parent', {}, function (er, code, stdio) {
      assert.equal(code, 0)
      assert.deepEqual(lines(stdio), ['AAA', 'BBB', 'CCC'])
      done(er)
    })
  },
  runRecursiveWhenDirHasSubdir: function (done) {
    runScripty('recursive', {}, function (er, code, stdio) {
      assert.equal(code, 0)
      assert.deepEqual(lines(stdio), ['AAA', 'BBB', 'CCC', 'aaa', 'bbb', 'ccc', 'rubby'])
      done(er)
    })
  }
}
