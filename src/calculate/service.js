const cache = require('../cache/cache');

module.exports = {getInflationRate};

/**
 * Calculates the inflation rate
 *
 * @param {JSON} request The request
 * @return {JSON} The response
 */
function getInflationRate(request) {
  const startPrice = cache.get(
      request.startCurrency,
      request.startDate.year,
      request.startDate.month,
  );
  const endPrice = cache.get(
      request.endCurrency,
      request.endDate.year,
      request.endDate.month,
  );
  const multiplyingFactor = endPrice / startPrice;
  const percent = ((endPrice - startPrice) / startPrice) * 100.0;
  const inflatedAmount = request.amount * multiplyingFactor;
  const response = request;
  response.percentChange = parseFloat(percent.toFixed(2));
  response.result = parseFloat(inflatedAmount.toFixed(2));
  return response;
}
