const Bull = require('bull')

const messageJobProcessor = require('./proccessors/messageProcessor')
const inlineQueryJobProcessor = require('./proccessors/inlineQueryJobProcessor')

const { BOT_NAME, BULL_OPTIONS } = require('../../config.json')

const botQueue = new Bull(BOT_NAME, BULL_OPTIONS)

botQueue.process('message', messageJobProcessor)
botQueue.process('inline_query', inlineQueryJobProcessor)

module.exports = botQueue
