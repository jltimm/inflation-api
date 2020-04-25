const dateParser = require('../../parser/dateParser');

module.exports = {validateRequest};

/**
 * Checks if the required params are present. The five required parameters are:
 * start_currency
 * end_currency
 * start_date
 * end_date
 * amuont
 *
 * @param {JSON} req The request
 * @return {JSON} The error message
 */
function validateRequest(req) {
  const errors = [];
  errors.push(validateCurrency('start_currency', req.query.start_currency));
  errors.push(validateCurrency('end_currency', req.query.end_currency));

  const startDate = validateDate('start_date', req.query.start_date);
  if (startDate.error !== null) {
    errors.push(startDate.error);
  }

  const endDate = validateDate('end_date', req.query.end_date);
  if (endDate.error !== null) {
    errors.push(endDate.error);
  }

  if (!endDate.error && !startDate.error) {
    if (endDate.year < startDate.year ||
       (endDate.year == startDate.year && (endDate.month < startDate.month))) {
      errors.push('end_date must be before start_date');
    }
  }

  errors.push(validateAmount('amount', req.query.amount));
  const filtered = errors.filter((el) => {
    return el != null;
  });
  return constructErrorMessage(filtered);
}

/**
 * Constructs an error message from the list of errors
 *
 * @param {Array} errors
 * @return {JSON} The error message. If no errors, then null
 */
function constructErrorMessage(errors) {
  if (errors.length == 0) {
    return null;
  }
  return {
    'message': 'The request is invalid.',
    'errors': errors,
  };
}

/**
 * Validates the currency parameter
 *
 * @param {String} paramName Name of the param: start_currency or end_currency
 * @param {String} currency Value of the param
 * @return {String} The error
 */
function validateCurrency(paramName, currency) {
  if (currency == null) {
    return paramName + ' is missing';
  }
  // TODO: Temporary. Grab list from database later
  if (currency !== 'USD') {
    return paramName + ' is not a supported currency.';
  }
  return null;
}

/**
 * Validates the date. Dates must be in yyyy-mm-dd format.
 *
 * @param {String} paramName Name of the param: start_date or end_date
 * @param {String} rawDate The raw
 * @return {String} The error
 */
function validateDate(paramName, rawDate) {
  if (rawDate == null) {
    return {error: paramName + ' is missing'};
  }
  const date = dateParser.parseDate(rawDate);
  if (date == null) {
    return {error: paramName + ' not a valid date.'};
  }
  return date;
}

/**
 * Validates the amount. Must be a valid decimal.
 *
 * @param {String} paramName Name of the param: amount
 * @param {String} amount The amount
 * @return {String} The error
 */
function validateAmount(paramName, amount) {
  if (amount == null) {
    return paramName + ' is missing';
  }
  const parsedAmount = parseInt(amount);
  if (isNaN(parsedAmount)) {
    return paramName + ' is not a number';
  }
  return null;
}
