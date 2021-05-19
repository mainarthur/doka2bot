const UserCommand = require('../types/UserCommand')
const { SPACE } = require('../constants')
const { isString } = require('./type')

/**
 *
 * @param {import('node-telegram-bot-api').Message} msg
 *
 * @returns {UserCommand}
 */
const commandParser = (msg) => {
  const {
    text: messageText,
    caption,
    entities: textEntites,
    caption_entities,
  } = msg

  const text = messageText ?? caption ?? ''
  const entities = textEntites ?? caption_entities ?? []

  if (!text && !entities) {
    return null
  }

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i]

    if (entity.offset === 0 && entity.type == 'bot_command') {
      if (isString(text[entity.length]) && text[entity.length] !== SPACE) {
        return null
      }
      return new UserCommand(
        text.substring(1, entity.length),
        text.substring(entity.length + 1).trim(),
      )
    }
  }

  return null
}

module.exports = commandParser
