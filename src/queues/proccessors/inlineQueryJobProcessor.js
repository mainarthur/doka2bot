const bot = require('../../bots/bot')
const { MAX_INLINE_RESULTS } = require('../../constants')
const logger = require('../../logger')
const Timedelta = require('../../types/Timedelta')
const inlineQueryExecuter = require('./executers/inlineQueryExecuter')

const getNowSec = () => Math.floor(Date.now() / 1000)

/**
 *
 * @param {import('bull').Job<import('node-telegram-bot-api').InlineQuery>} job
 */
const inlineQueryJobProcessor = async ({ data: inlineQuery }) => {
  const {
    query,
    id: queryId,
    from: { id: userId, language_code: locale },
    offset,
  } = inlineQuery
  const currentOffset = +(offset || 0)
  const start = getNowSec()

  try {
    const results = inlineQueryExecuter({ query, locale })

    const answered = await bot.answerInlineQuery(
      queryId,
      results.slice(
        MAX_INLINE_RESULTS * currentOffset,
        MAX_INLINE_RESULTS * (currentOffset + 1),
      ),
      {
        cache_time: 0,
        is_personal: true,
        next_offset: `${currentOffset + 1}`,
      },
    )

    if (answered) {
      logger.log(
        `[${new Date().toLocaleString()}][#id${userId}][inlineQuery][offset:${currentOffset}] ${query} ${new Timedelta(
          start,
          getNowSec(),
        )}`,
      )
    }
  } catch (err) {
    logger.err(err)
  }
}

module.exports = inlineQueryJobProcessor
