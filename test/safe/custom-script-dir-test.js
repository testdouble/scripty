var runScripty = require('../run-scripty')

module.exports = {
  basic: function (done) {
    runScripty('secret', {
      resolve: {
        scripts: 'test/fixtures/custom-user-scripts',
        scriptsWin: 'test/fixtures/custom-user-scripts-win'
      }
    }, function (er, code, stdio) {
      assert.equal(code, 0)
      assert.includes(stdio.stdout, 'SSHHH')
      done(er)
    })
  }
}
