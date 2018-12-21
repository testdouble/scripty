const util = require('util')

const constant = val => () => val

const formatError = args =>
  args.map(arg => arg instanceof Error ? arg.message : arg)

const loggerWithPrefix = (prefix, writer) => (...args) =>
  writer()(prefix, util.format(...formatError(args))
    .replace(/(\r?\n)(?=[\s\S]+)/g, `$1${prefix} `))

const silentLogger = (...args) => {
  output += util.format(...args) + '\n'
}

let level
let output

module.exports = {
  get level () {
    return level.toString()
  },

  set level (l) {
    level = module.exports[String(l).toLowerCase()]
  },

  read: () => output,

  reset: () => {
    output = ''
    module.exports.level = 'info'
  }
}

;[
  ['verbose', '>'],
  ['info', '>'],
  ['warn', 'WARN'],
  ['error', 'ERR!'],
  ['silent']
].forEach(([name, prefix], index) => {
  const logger = loggerWithPrefix(`scripty ${prefix}`, () =>
    level <= logger ? console.error : silentLogger)

  logger.valueOf = constant(index + 1)
  logger.toString = constant(name)

  module.exports[name] = logger
})

module.exports.reset()
