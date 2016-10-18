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
  }
}
