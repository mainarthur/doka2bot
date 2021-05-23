const logger = require('../../logger')

const commandParser = require('../../util/commandParser')
const commandExecuter = require('./executers/commandExecuter')

/**
 *  @param {import('bull').Job<import("node-telegram-bot-api").Message>}  job
 */
const messageJobProcessor = async ({ data: message }) => {
  try {
    const command = commandParser(message)

    if (command) {
      await commandExecuter(command, message)
    }
  } catch (err) {
    logger.err(err)
  }
}

module.exports = messageJobProcessor
