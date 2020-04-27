module.exports = {notSupported};

/**
 * Formats the not supported currency error
 *
 * @param {String} value The bad value
 * @return {String} The formatted error
 */
function notSupported(value) {
  return `[${value}] is not a supported currency`;
}
