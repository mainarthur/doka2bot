const Command = require('./Command')

const bot = require('../bots/bot')

const t18g = require('../locales')

const { ParseMode, ChatAction } = require('../constants')
const pull = require('../util/pull')
const logger = require('../logger')

class PullCommand extends Command {
  constructor() {
    super()
  }

  /**
   * @returns {import('node-telegram-bot-api').ChatAction}
   */
  get action() {
    return ChatAction.typing
  }

  get admin() {
    return true
  }

  /**
   * @param {import('./Command').Payload} payload
   */
  async method({ chatId, locale }) {
    try {
      await pull()
      return bot.sendMessage(chatId, t18g(locale)`pull_done`, {
        parse_mode: ParseMode.HTML,
      })
    } catch (err) {
      logger.err(err)
      return bot.sendMessage(chatId, t18g(locale)`pull_undone`, {
        parse_mode: ParseMode.HTML,
      })
    }
  }
}

module.exports = PullCommand
