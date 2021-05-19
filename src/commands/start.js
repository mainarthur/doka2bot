const bot = require('../bots/bot')
const { ParseMode, ChatAction } = require('../constants')
const t18g = require('../locales')

const Command = require('./Command')

class StartCommand extends Command {
  constructor() {
    super()
  }

  /**
   * @returns {import('node-telegram-bot-api').ChatAction}
   */
  get action() {
    return ChatAction.typing
  }

  /**
   * @param {import('./Command').Payload} payload
   */
  async method({ chatId, locale }) {
    return bot.sendMessage(chatId, t18g(locale)`start`, {
      parse_mode: ParseMode.HTML,
      disable_web_page_preview: true,
    })
  }
}

module.exports = StartCommand
