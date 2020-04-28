module.exports = {endDateBeforeStartDate, errorWithRequest, paramMissing};

/**
 * Returns the end date before start date error
 *
 * @return {String} The error
 */
function endDateBeforeStartDate() {
  return 'end_date must be after start_date';
}

/**
 * Returns the general error message
 *
 * @return {String} The error message
 */
function errorWithRequest() {
  return 'There was an error with the request';
}

/**
 * Returns the paramName is missing error
 *
 * @param {String} paramName The parameter name
 * @return {String} The formatted error
 */
function paramMissing(paramName) {
  return `${paramName} is missing`;
}
