const logger = require('../logger')
const botQueue = require('../queues/botQueue')

const { RATE_LIMITER } = require('../../config.json')

/**
 * @typedef {Number} Timestamp
 * @typedef {Number} Id
 * @typedef {Number} MessagesCount
 * @typedef {Object.<Timestamp, MessagesCount>} ReqestsTable
 */

/**
 *
 * @param {string} updateType
 * @returns {(data: any) => void}
 */
const updateHandler = (updateType) => {
  /**
   * Rate limiter store object
   * @type {Object.<Id, ReqestsTable>}
   */
  const rateLimiter = {}

  return async (data) => {
    if (RATE_LIMITER[updateType]) {
      /**
       * @type {{ id: Id }}
       */
      const { id } = data.chat ?? data.from

      if (id) {
        const seconds = Math.ceil(Date.now() / 1000)

        if (!rateLimiter[id]) {
          rateLimiter[id] = {}
        }

        if (!rateLimiter[id][seconds]) {
          rateLimiter[id] = { [seconds]: 0 }
        }

        rateLimiter[id][seconds]++

        if (rateLimiter[id][seconds] > RATE_LIMITER[updateType]) {
          return
        }
      }
    }

    try {
      await botQueue.add(updateType, data)
    } catch (err) {
      logger.error(err)
    }
  }
}

module.exports = updateHandler
