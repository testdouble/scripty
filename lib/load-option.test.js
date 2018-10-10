var subject = require('./load-option')

module.exports = {
  beforeEach: function () {
    delete process.env.SCRIPTY_TEST_KEY
    delete process.env.npm_package_scripty_testKey
  },
  envTrue: function () {
    process.env.SCRIPTY_TEST_KEY = 'true'

    assert.equal(subject('testKey'), true)
  },
  envFalse: function () {
    process.env.SCRIPTY_TEST_KEY = 'false'

    assert.equal(subject('testKey'), false)
  },
  packageTrue: function () {
    process.env.npm_package_scripty_testKey = true

    assert.equal(subject('testKey'), true)
  },
  packageFalse: function () {
    process.env.npm_package_scripty_testKey = false

    assert.equal(subject('testKey'), false)
  },
  envOverrideTrue: function () {
    process.env.SCRIPTY_TEST_KEY = 'true'
    process.env.npm_package_scripty_testKey = false

    assert.equal(subject('testKey'), true)
  },
  envOverrideFalse: function () {
    process.env.SCRIPTY_TEST_KEY = 'false'
    process.env.npm_package_scripty_testKey = true

    assert.equal(subject('testKey'), false)
  },
  packageString: function () {
    process.env.npm_package_scripty_testKey = 'some value'

    assert.equal(subject('testKey'), 'some value')
  },
  envString: function () {
    process.env.SCRIPTY_TEST_KEY = 'some value'

    assert.equal(subject('testKey'), 'some value')
  },
  envOverrideString: function () {
    process.env.SCRIPTY_TEST_KEY = 'right value'
    process.env.npm_package_scripty_testKey = 'wrong value'

    assert.equal(subject('testKey'), 'right value')
  },
  packageArray: function () {
    process.env.npm_package_scripty_testKey_0 = 'value 1'
    process.env.npm_package_scripty_testKey_1 = 'value 2'
    process.env.npm_package_scripty_testKey_2 = 'value 3'

    assert.deepEqual(subject('testKey'), ['value 1', 'value 2', 'value 3'])
  }
}
