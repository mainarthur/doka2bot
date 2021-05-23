const crypto = require('crypto')
const { HTML } = require('telegram-escape')

const t18g = require('../locales')

const { ParseMode } = require('../constants')

class SearchArticleAdapter {
  /**
   *
   * @param {import('./SearchEngine')} searchEngine
   * @param {String} locale
   * @param {String} searchQuery
   */
  constructor(searchEngine, locale, searchQuery) {
    if (!searchEngine) throw new Error('"documentation" field is required')
    if (!locale) throw new Error('"locale" field is required')
    if (!searchQuery) throw new Error('"searchQuery" field is required')

    const { name, icon, displayName } = searchEngine

    const nameToDisplay = displayName ?? name

    this.id = crypto.randomUUID()
    this.type = 'article'
    this.title = nameToDisplay
    this.input_message_content = {
      message_text: HTML`<b>${nameToDisplay}</b>

<i>${searchQuery}</i>`,
      parse_mode: ParseMode.HTML,
    }
    if (icon) this.thumb_url = icon
    this.reply_markup = {
      inline_keyboard: [
        [
          {
            text: t18g(locale)`open_search`,
            url: searchEngine.search(searchQuery),
          },
        ],
      ],
    }
  }
}

module.exports = SearchArticleAdapter
