var _ = require('lodash')

module.exports = function (assert) {
  return _.extend({}, assert, {
    includes: function (actual, expected) {
      if (!_.includes(actual, expected)) {
        throw new Error(
          'AssertionError: expected:\n\n"' + actual +
          '"\n\n to contain:\n\n"' + expected + '"\n\n'
        )
      }
    }
  })
}
