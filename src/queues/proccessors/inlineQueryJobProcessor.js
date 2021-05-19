/**
 *
 * @param {import('bull').Job<import('node-telegram-bot-api').InlineQuery>} job
 */
const inlineQueryJobProcessor = async ({ data: inlineQuery }) => {
  const { query } = inlineQuery
}

module.exports = inlineQueryJobProcessor
