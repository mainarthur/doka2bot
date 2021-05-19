const TelegramBot = require('node-telegram-bot-api')

const { TELEGRAM_BOT_TOKEN } = require('../../config.json')

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN)

module.exports = bot
