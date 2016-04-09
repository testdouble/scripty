var scripty = require('../../index')

module.exports = function worksWithNoOpts (done) {
  scripty('noop', function (er, code) {
    assert.equal(0, code)
    done(er)
  })
}
