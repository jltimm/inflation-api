const {DateTime} = require('luxon');

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
  errors.push(validateDate('start_date', req.query.start_date));
  errors.push(validateDate('end_date', req.query.end_date));
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
    return paramName + ' missing';
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
 * @param {String} date The date
 * @return {String} The error
 */
function validateDate(paramName, date) {
  if (date == null) {
    return paramName + ' missing';
  }
  // TODO: Make a more customizable date parser
  const d = DateTime.fromFormat(date, 'yyyy-MM');
  if (!d.isValid) {
    return paramName + ' not a valid date. Reason: ' + d.invalidReason;
  }
  return null;
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
    return paramName + ' missing';
  }
  const parsedAmount = parseInt(amount);
  if (isNaN(parsedAmount)) {
    return paramName + ' is not a number';
  }
  return null;
}
