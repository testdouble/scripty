var version = require('semver')(process.version)

module.exports = version.major === 0 && version.minor < 11
