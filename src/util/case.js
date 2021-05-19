const { isString } = require('./type')

// Matches uppercase letter
const uppercaseRegex = /([A-Z])/g

/**
 * @param {String | Object} arg - string or object with keys in camel case
 *
 * @returns {String | Object} - string or object with keys in snake case
 */
function snakeCase(arg) {
  if (isString(arg)) {
    return arg.replace(uppercaseRegex, '_$1').toLowerCase()
  }

  return Object.keys(arg).reduce((acc, key) => {
    if (arg[key] && typeof arg[key] === 'object') {
      acc[snakeCase(key)] = snakeCase(arg[key])
    } else {
      acc[snakeCase(key)] = arg[key]
    }

    return acc
  }, {})
}

module.exports = { snakeCase }
