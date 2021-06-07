/**
 * @typedef {Object} Payload
 * @property {Number} [chatId]
 * @property {String} [argument]
 * @property {String} [locale]
 * @property {import('node-telegram-bot-api').Message} [message]
 */

/**
 * @abstract
 */
class Command {
  /**
   * @abstract
   *
   * @returns {import('node-telegram-bot-api').ChatAction}
   */
  get action() {
    throw new Error('Abstract property')
  }

  /**
   * @abstract
   * @returns {Boolean}
   */
  get admin() {
    return false
  }

  /**
   * @abstract
   *
   * @param {Payload} _payload
   *
   * @returns {Promise<Object>}
   */
  async method(_payload) {
    throw new Error('Abstract method')
  }
}

module.exports = Command
