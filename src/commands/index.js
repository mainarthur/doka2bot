const StartCommand = require('./start')

/**
 * @typedef {String} CommandName
 *
 * @type {Object.<CommandName, import('./Command')>}
 */
const commandsRoutes = {
  start: new StartCommand(),
}

module.exports = commandsRoutes
