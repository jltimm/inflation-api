const request = require('supertest');
const app = require('../../src/inflation');

let server;

beforeEach(async () => {
  server = await app.listen(4000);
  global.agent = request.agent(server);
});

describe('Inflation controller tests: good requests', () => {
  test('Good request, correct response found', async () => {
    const request = getRequestParams('USD', 'USD', '2020-05', '2020-06', '123');
    const res = await global.agent
        .get(request)
        .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      startCurrency: 'usd',
      endCurrency: 'usd',
      startDate: {
        year: 2020,
        month: 5,
      },
      endDate: {
        year: 2020,
        month: 6,
      },
      amount: 123,
    });
  });
});

describe('Inflation controller tests: bad requests', () => {
  test('Bad request: no parameters given', async () => {
    const request = getRequestParams(null, null, null, null, null);
    const res = await global.agent
        .get(request)
        .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'There was an error with the request',
      errors: [
        'start_currency is missing',
        'end_currency is missing',
        'start_date is missing',
        'end_date is missing',
        'amount is missing',
      ],
    });
  });
  test('Bad request: start_currency not USD', async () => {
    const request = getRequestParams('US', 'USD', '2000-01', '2020-05', '1.0');
    const res = await global.agent
        .get(request)
        .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'There was an error with the request',
      errors: [
        'start_currency: [US] is not a supported currency',
      ],
    });
  });
  test('Bad request: end_currency not USD', async () => {
    const request = getRequestParams('USD', 'AA', '2000-01', '2020-05', '1.0');
    const res = await global.agent
        .get(request)
        .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'There was an error with the request',
      errors: [
        'end_currency: [AA] is not a supported currency',
      ],
    });
  });
  test('Bad request: start_date not of form YYYY-MM', async () => {
    const request = getRequestParams('USD', 'USD', '200101', '2020-01', '1.0');
    const res = await global.agent
        .get(request)
        .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'There was an error with the request',
      errors: [
        'start_date: [200101] must be of the form YYYY-MM',
      ],
    });
  });
  test('Bad request: start_date has invalid characters in year', async () => {
    const request = getRequestParams('USD', 'USD', '200A-01', '2020-01', '1.0');
    const res = await global.agent
        .get(request)
        .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'There was an error with the request',
      errors: [
        'start_date: [200A-01] contains invalid characters',
      ],
    });
  });
  test('Bad request: start_date has invalid characters in month', async () => {
    const request = getRequestParams('USD', 'USD', '2001-A1', '2020-01', '1.0');
    const res = await global.agent
        .get(request)
        .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'There was an error with the request',
      errors: [
        'start_date: [2001-A1] contains invalid characters',
      ],
    });
  });
  test('Bad request: start_date month less than 1', async () => {
    const request = getRequestParams('USD', 'USD', '2001-00', '2020-01', '1.0');
    const res = await global.agent
        .get(request)
        .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'There was an error with the request',
      errors: [
        'start_date: [2001-00] month must be between 1 and 12',
      ],
    });
  });
  test('Bad request: start_date month greater than 12', async () => {
    const request = getRequestParams('USD', 'USD', '2001-13', '2020-01', '1.0');
    const res = await global.agent
        .get(request)
        .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'There was an error with the request',
      errors: [
        'start_date: [2001-13] month must be between 1 and 12',
      ],
    });
  });
  test('Bad request: start_date has year 0', async () => {
    const request = getRequestParams('USD', 'USD', '0000-12', '2020-01', '1.0');
    const res = await global.agent
        .get(request)
        .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'There was an error with the request',
      errors: [
        'start_date: [0000-12] year must not be zero',
      ],
    });
  });
  test('Bad request: end_date not of form YYYY-MM', async () => {
    const request = getRequestParams('USD', 'USD', '2001-01', '202001', '1.0');
    const res = await global.agent
        .get(request)
        .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'There was an error with the request',
      errors: [
        'end_date: [202001] must be of the form YYYY-MM',
      ],
    });
  });
  test('Bad request: end_date has invalid characters in year', async () => {
    const request = getRequestParams('USD', 'USD', '2001-01', '20F0-01', '1.0');
    const res = await global.agent
        .get(request)
        .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'There was an error with the request',
      errors: [
        'end_date: [20F0-01] contains invalid characters',
      ],
    });
  });
  test('Bad request: end_date has invalid characters in month', async () => {
    const request = getRequestParams('USD', 'USD', '2001-11', '2020-A1', '1.0');
    const res = await global.agent
        .get(request)
        .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'There was an error with the request',
      errors: [
        'end_date: [2020-A1] contains invalid characters',
      ],
    });
  });
  test('Bad request: end_date month less than 1', async () => {
    const request = getRequestParams('USD', 'USD', '2001-01', '2020-00', '1.0');
    const res = await global.agent
        .get(request)
        .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'There was an error with the request',
      errors: [
        'end_date: [2020-00] month must be between 1 and 12',
      ],
    });
  });
  test('Bad request: end_date month greater than 12', async () => {
    const request = getRequestParams('USD', 'USD', '2001-11', '2020-13', '1.0');
    const res = await global.agent
        .get(request)
        .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'There was an error with the request',
      errors: [
        'end_date: [2020-13] month must be between 1 and 12',
      ],
    });
  });
  test('Bad request: end_date has year 0', async () => {
    const request = getRequestParams('USD', 'USD', '1000-12', '0000-01', '1.0');
    const res = await global.agent
        .get(request)
        .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'There was an error with the request',
      errors: [
        'end_date: [0000-01] year must not be zero',
      ],
    });
  });
  test('Bad request: Amount not a number', async () => {
    const request = getRequestParams('USD', 'USD', '2000-12', '2020-01', 'abd');
    const res = await global.agent
        .get(request)
        .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'There was an error with the request',
      errors: [
        'amount: [abd] is not a number',
      ],
    });
  });
  test('Bad request: Amount less than zero', async () => {
    const request = getRequestParams('USD', 'USD', '2000-12', '2020-01', '-1');
    const res = await global.agent
        .get(request)
        .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'There was an error with the request',
      errors: [
        'amount: [-1] must be greater than zero',
      ],
    });
  });
  test('Bad request: Issues with ever parameter', async () => {
    const request = getRequestParams('US', 'U', 'abcd-a', '2020/01', '-2.0');
    const res = await global.agent
        .get(request)
        .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'There was an error with the request',
      errors: [
        'start_currency: [US] is not a supported currency',
        'end_currency: [U] is not a supported currency',
        'start_date: [abcd-a] contains invalid characters',
        'end_date: [2020/01] must be of the form YYYY-MM',
        'amount: [-2.0] must be greater than zero',
      ],
    });
  });
  test('Bad request: All values empty', async () => {
    const request = getRequestParams('', '', '', '', '');
    const res = await global.agent
        .get(request)
        .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'There was an error with the request',
      errors: [
        'start_currency is missing',
        'end_currency is missing',
        'start_date is missing',
        'end_date is missing',
        'amount is missing',
      ],
    });
  });
});

afterEach(async () => {
  await server.close();
});

afterAll(async () => {
  await new Promise(
      (resolve) => setTimeout(() => resolve(), 500));
});

/**
 * Constructs the request params from the given variables
 *
 * @param {String} startCurrency The start currency
 * @param {String} endCurrency The end currency
 * @param {String} startDate The start date
 * @param {String} endDate The end date
 * @param {String} amount The amount
 * @return {String} The request params
 */
function getRequestParams(
    startCurrency,
    endCurrency,
    startDate,
    endDate,
    amount,
) {
  return '/v1/calculate?' +
         (!startCurrency ? '' : `start_currency=${startCurrency}&`) +
         (!endCurrency ? '' : `end_currency=${endCurrency}&`) +
         (!startDate ? '' : `start_date=${startDate}&`) +
         (!endDate ? '' : `end_date=${endDate}&`) +
         (!amount ? '' : `amount=${amount}&`);
}
