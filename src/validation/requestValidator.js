const parseDate = require('../parser/dateParser');
const parseAmount = require('../parser/amountParser');
const parseCurrency = require('../parser/currencyParser');
const constants = require('../constants/validationConstants');

module.exports = {validateRequest};

/**
 * Checks if the required params are present. The five required parameters are:
 * start_currency
 * end_currency
 * start_date
 * end_date
 * amount
 *
 * @param {JSON} req The request
 * @return {JSON} The response. Could be an error or a good response
 */
function validateRequest(req) {
  return constructResponse(
      validateCurrency('start_currency', req.query.start_currency),
      validateCurrency('end_currency', req.query.end_currency),
      validateDate('start_date', req.query.start_date),
      validateDate('end_date', req.query.end_date),
      validateAmount('amount', req.query.amount),
  );
}

/**
 * Constructs a reponse based on how each parameter was validated.
 *
 * @param {JSON} startCurrency The validated start currency
 * @param {JSON} endCurrency The validated end currency
 * @param {JSON} startDate The validated start date
 * @param {JSON} endDate The validated end date
 * @param {JSON} amount The validated amount
 * @return {JSON} The response
 */
function constructResponse(
    startCurrency,
    endCurrency,
    startDate,
    endDate,
    amount,
) {
  const errors = [];
  const response = {};
  if (!!startCurrency.error) {
    errors.push(startCurrency.error);
  } else {
    response.start_currency = startCurrency.currency;
  }
  if (!!endCurrency.error) {
    errors.push(endCurrency.error);
  } else {
    response.end_currency = endCurrency.currency;
  }
  if (!!startDate.error) {
    errors.push(startDate.error);
  } else {
    response.start_date = startDate;
  }
  if (!!endDate.error) {
    errors.push(endDate.error);
  } else {
    response.endDate = endDate;
  }
  if (isEndDateBeforeStartDate(startDate, endDate)) {
    errors.push(constants.endDateBeforeStartDate());
  }
  if (!!amount.error) {
    errors.push(amount.error);
  } else {
    response.amount = amount.amount;
  }
  return errors.length == 0 ?
          response :
          {message: constants.errorWithRequest(), errors: errors};
}

/**
 * Checks if the end date is before the start date
 *
 * @param {JSON} startDate The start date
 * @param {JSON} endDate The end date
 * @return {Boolean} If the end date is before the start date
 */
function isEndDateBeforeStartDate(startDate, endDate) {
  if (!endDate.error && !startDate.error) {
    if (endDate.year < startDate.year ||
       (endDate.year == startDate.year && (endDate.month < startDate.month))) {
      return true;
    }
  }
  return false;
}

/**
 * Validates the currency parameter
 *
 * @param {String} paramName Name of the param: start_currency or end_currency
 * @param {String} rawCurrency Value of the param
 * @return {JSON} The parsed value (could contain error)
 */
function validateCurrency(paramName, rawCurrency) {
  if (rawCurrency == null || rawCurrency === '') {
    return {error: constants.paramMissing(paramName)};
  }
  return padWithParam(paramName, parseCurrency(rawCurrency));
}

/**
 * Validates the date. Dates must be in yyyy-mm-dd format.
 *
 * @param {String} paramName Name of the param: start_date or end_date
 * @param {String} rawDate The raw
 * @return {JSON} The parsed value (could contain error)
 */
function validateDate(paramName, rawDate) {
  if (rawDate == null || rawDate === '') {
    return {error: constants.paramMissing(paramName)};
  }
  return padWithParam(paramName, parseDate(rawDate));
}

/**
 * Validates the amount. Must be a valid decimal.
 *
 * @param {String} paramName Name of the param: amount
 * @param {String} rawAmount The amount
 * @return {JSON} The parsed value (could contain error)
 */
function validateAmount(paramName, rawAmount) {
  if (rawAmount == null || rawAmount === '') {
    return {error: constants.paramMissing(paramName)};
  }
  return padWithParam(paramName, parseAmount(rawAmount));
}

/**
 * Appends paramName to the error message, if present
 *
 * @param {String} paramName The name of the parameter
 * @param {JSON} value The value from the parsed function
 * @return {JSON} The value with the modified error message
 */
function padWithParam(paramName, value) {
  if (!!value.error) {
    value.error = paramName + ': ' + value.error;
  }
  return value;
}
