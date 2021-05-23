const path = require('path')
const bot = require('./src/bots/bot')
const logger = require('./src/logger')
const updateHandler = require('./src/bots/updateHandler')

const DocumentationRepository = require('./src/api/DocumentationRepository')
const SearchEngineRepository = require('./src/api/SearchEngineRepository')

const { ALLOWED_UPDATES } = require('./config.json')

void (async () => {
  await DocumentationRepository.load(
    path.join(__dirname, './src/documentations'),
  )
  await SearchEngineRepository.load(path.join(__dirname, './src/search'))
  for (const updateType of ALLOWED_UPDATES) {
    // @ts-ignore
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
