var subject = require('./optionify')

module.exports = {
  beforeEach: function () {
    this.dummy = function (main, options, cb) {
      return { main: main, options: options, cb: cb }
    }
    this.defaults = { deep: { a: 2 } }

    // prevent inferring log level
    delete process.env.npm_config_loglevel
  },
  deepMergeOptions: function () {
    var cb = function () { return 'bar' }

    var result = subject(this.dummy, this.defaults)('foo', { deep: { b: 3 } }, cb)

    assert.equal(result.main, 'foo')
    assert.deepEqual(result.options, { deep: { a: 2, b: 3 } })
    assert.equal(result.cb(), 'bar')
  },
  nothingProvidedFine: function () {
    var result = subject(this.dummy, this.defaults)()

    assert.equal(result.main, undefined)
    assert.deepEqual(result.options, this.defaults)
    assert.equal(result.cb(), undefined)
  },
  noOptionsProvided: function () {
    var cb = function () { return 'bar' }

    var result = subject(this.dummy, this.defaults)('foo', cb)

    assert.equal(result.main, 'foo')
    assert.deepEqual(result.options, this.defaults)
    assert.equal(result.cb(), 'bar')
  }
}
