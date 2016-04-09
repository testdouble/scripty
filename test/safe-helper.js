var decorateAssertions = require('./decorate-assertions')
global.assert = decorateAssertions(require('assert'))
