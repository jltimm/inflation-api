module.exports = {notANumber, lessThanZero};

/**
 * Formats the not a number error
 *
 * @param {String} value The bad value
 * @return {String} The formatted error
 */
function notANumber(value) {
  return `[${value}] is not a number`;
}

/**
 * Formats the less than zero error
 *
 * @param {String} value The bad value
 * @return {String} The formatted error
 */
function lessThanZero(value) {
  return `[${value}] must be greater than zero`;
}
