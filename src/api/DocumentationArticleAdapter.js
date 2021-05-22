const crypto = require('crypto')
const { HTML } = require('telegram-escape')
const t18g = require('../locales')

class DocumentationArticleAdapter {
  /**
   *
   * @param {import('./Documentation')} documentation
   * @param {String} locale
   * @param {String} [searchQuery]
   */
  constructor(documentation, locale, searchQuery) {
    if (!documentation) throw new Error('"documentation" field is required')
    const { name, description, link, icon } = documentation

    this.id = crypto.randomUUID()
    this.type = 'article'
    this.title = name
    this.description = description
    this.input_message_content = {
      message_text: HTML`<b>${name}</b>\n\n${description}`,
    }
    this.thumb_url = icon
    this.reply_markup = {
      inline_keyboard: [
        [
          {
            text: t18g(locale)`open`,
            url: searchQuery ? documentation.search(searchQuery) : link,
          },
        ],
      ],
    }
  }
}

module.exports = DocumentationArticleAdapter
