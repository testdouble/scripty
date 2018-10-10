var _ = require('lodash')

module.exports = function loadOption (name) {
  if (envVarSet(posixEnvVarName(name))) {
    return boolEnvVarValue(posixEnvVarName(name))
  } else if (envVarSet(packageEnvVarName(name))) {
    return boolEnvVarValue(packageEnvVarName(name))
  } else if (envVarSet(packageArrayEnvVarName(name))) {
    return arrayEnvVarValue(packageEnvVarName(name))
  }
}

function boolEnvVarValue (envVarName) {
  var value = process.env[envVarName]

  if (value === 'true') {
    return true
  } else if (value === 'false') {
    return false
  } else {
    return value
  }
}

function arrayEnvVarValue (envVarName) {
  var count = 0
  var result = []

  while (envVarSet(envVarName + '_' + count)) {
    result.push(process.env[envVarName + '_' + count])
    count++
  }

  return result
}

function envVarSet (envVarName) {
  return !!process.env[envVarName]
}

function posixEnvVarName (optionName) {
  return 'SCRIPTY_' + _.snakeCase(optionName).toUpperCase()
}

function packageEnvVarName (optionName) {
  return 'npm_package_scripty_' + optionName
}

function packageArrayEnvVarName (optionName) {
  return packageEnvVarName(optionName) + '_0'
}
