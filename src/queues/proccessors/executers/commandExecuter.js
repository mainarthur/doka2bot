const Timedelta = require('../../../types/Timedelta')

const bot = require('../../../bots/bot')

const commandsRoutes = require('../../../commands')

const logger = require('../../../logger')

const { ADMIN_ID } = require('../../../../config.json')

/**
 *
 * @param {import('../../../types/UserCommand')} command
 * @param {import('node-telegram-bot-api').Message} message
 */
const commandExecuter = async (command, message) => {
  const { commandName, argument } = command
  const { date } = message
  const { id: chatId } = message.chat
  const { id: userId, language_code: locale } = message.from ?? {}

  if (!commandsRoutes[commandName]) return

  /**
   * @type {import('../../../commands/Command')}
   */
  const commandHandler = commandsRoutes[commandName]

  if (commandHandler.admin && userId !== ADMIN_ID) return

  if (commandHandler.action) {
    await bot.sendChatAction(chatId, commandHandler.action)
  }

  /**
   * @type {import('node-telegram-bot-api').Message}
   */
  const responseMessage = await commandHandler.method({
    chatId,
    argument,
    message,
    locale,
  })

  logger.log(
    `[${new Date().toLocaleString()}]${
      userId
        ? `[#id${userId}]${userId !== chatId ? `[#cid${chatId}]` : ''}`
        : ''
    } ${command} ${
      responseMessage ? new Timedelta(date, responseMessage.date) : ''
    }`,
  )
}

module.exports = commandExecuter
