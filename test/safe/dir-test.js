var runScripty = require('../run-scripty')

module.exports = {
  runsIndexWhenDirIsFound: function (done) {
    runScripty('top', {}, function (er, code, stdio) {
      assert.equal(code, 0)
      assert.includes(stdio.stdout, 'rubby')
      done(er)
    })
  },
  runAllWhenDirHasNoIndex: function (done) {
    runScripty('parent', {}, function (er, code, stdio) {
      assert.equal(code, 0)
      assert.includes(stdio.stdout, 'AAA')
      assert.includes(stdio.stdout, 'BBB')
      assert.includes(stdio.stdout, 'CCC')
      done(er)
    })
  }
}
