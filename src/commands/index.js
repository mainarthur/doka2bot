const PullCommand = require('./pull')
const StartCommand = require('./start')

/**
 * @typedef {String} CommandName
 *
 * @type {Object.<CommandName, import('./Command')>}
 */
const commandsRoutes = {
  start: new StartCommand(),
  pull: new PullCommand(),
}

module.exports = commandsRoutes
