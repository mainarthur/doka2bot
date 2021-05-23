const STRING_START_INDEX = 0
const BOT_COMMAND_TYPE = 'bot_command'
const AT_SIGN = '@'
const NOT_FOUND_INDEX = -1
const SPACE = ' '
const EMPTY_STRING = ''
const JSON_EXT = '.json'
const GIF_EXT = '.gif'
const DECIMAL_RADIX = 10
const MAX_INLINE_RESULTS = 50

// Matches "{0}", "{1}" for formatting
const INSERTION_REGEXP = /\{\d+\}/g

/**
 * @type {Object.<string, import('node-telegram-bot-api').ChatAction>}
 */
const ChatAction = Object.freeze({
  typing: 'typing',
  uploadPhoto: 'upload_photo',
})

/**
 * @type {Object.<string, import('node-telegram-bot-api').ParseMode>}
 */
const ParseMode = Object.freeze({
  HTML: 'HTML',
})

module.exports = Object.freeze({
  STRING_START_INDEX,
  BOT_COMMAND_TYPE,
  AT_SIGN,
  MAX_INLINE_RESULTS,
  SPACE,
  NOT_FOUND_INDEX,
  EMPTY_STRING,
  JSON_EXT,
  GIF_EXT,
  ChatAction,
  ParseMode,
  DECIMAL_RADIX,
  INSERTION_REGEXP,
})
