const scripty = require('../../lib/scripty')

module.exports = function worksWithNoOpts (done) {
  process.env.npm_config_loglevel = 'silent'

  scripty('noop', function (er, code) {
    assert.equal(0, code)
    done(er)
  })
}
