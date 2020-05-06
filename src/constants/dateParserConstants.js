module.exports ={
  mustBeYYYYMMDD,
  invalidCharacters,
  invalidMonth,
  yearZero,
  invalidDays,
};

/**
 * Returns the bad format error
 *
 * @param {String} value The bad value
 * @return {String} The formatted error
 */
function mustBeYYYYMMDD(value) {
  return `[${value}] must be of the form YYYY-MM-DD, YYYY-MM, or YYYY`;
}

/**
 * Returns the invalid characters error
 *
 * @param {String} value The bad value
 * @return {String} The formatted error
 */
function invalidCharacters(value) {
  return `[${value}] contains invalid characters`;
}

/**
 * Returns the invalid month error
 *
 * @param {String} value The bad value
 * @return {String} The formatted error
 */
function invalidMonth(value) {
  return `[${value}] month must be between 1 and 12`;
}

/**
 * Returns the year zero error
 *
 * @param {String} value The bad value
 * @return {String} The formatted error
 */
function yearZero(value) {
  return `[${value}] year must not be zero`;
}

/**
 * Returns the invalid years error
 *
 * @param {String} value The bad value
 * @return {String} The formatted error
 */
function invalidDays(value) {
  return `[${value}] has an invalid day for the given month and year`;
}
