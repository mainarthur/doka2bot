const bot = require('../../bots/bot')
const { MAX_INLINE_RESULTS } = require('../../constants')
const inlineQueryExecuter = require('./executers/inlineQueryExecuter')

/**
 *
 * @param {import('bull').Job<import('node-telegram-bot-api').InlineQuery>} job
 */
const inlineQueryJobProcessor = async ({ data: inlineQuery }) => {
  const {
    query,
    id: queryId,
    from: { language_code: locale },
  } = inlineQuery

  const results = inlineQueryExecuter({ query, locale })

  await bot.answerInlineQuery(queryId, results.slice(0, MAX_INLINE_RESULTS), {
    cache_time: 0,
    is_personal: true,
  })
}

module.exports = inlineQueryJobProcessor
