const path = require('path')
const bot = require('./src/bots/bot')
const logger = require('./src/logger')
const updateHandler = require('./src/bots/updateHandler')

const { ALLOWED_UPDATES } = require('./config.json')
const DocumentationRepository = require('./src/api/DocumentationRepository')

void (async () => {
  await DocumentationRepository.load(
    path.join(__dirname, './src/documentations'),
  )
  logger.log(DocumentationRepository)
  for (const updateType of ALLOWED_UPDATES) {
    bot.on(updateType, updateHandler(updateType))
  }

  await bot.startPolling({
    polling: {
      params: {
        allowed_updates: ALLOWED_UPDATES,
      },
    },
  })

  logger.log(`Bot is started at ${new Date().toLocaleString()}`)
})()
