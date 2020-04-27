const parseCurrency = require('../../src/parser/currencyParser');

describe('Currency parser: Invalid currency', () => {
  test('Currency is not valid', () => {
    const parsedCurrency = parseCurrency('US');
    expect(parsedCurrency)
        .toEqual({error: '[US] is not a supported currency'});
  });
  test('Currency is not valid, with spaces', () => {
    const parsedCurrency = parseCurrency('uS D  ');
    expect(parsedCurrency)
        .toEqual({error: '[uS D  ] is not a supported currency'});
  });
});

describe('Currency parser: Valid currency', () => {
  const expected = {currency: 'usd'};
  test('Currency is valid, all lowercase', () => {
    const parsedCurrency = parseCurrency('usd');
    expect(parsedCurrency).toEqual(expected);
  });
  test('Currency is valid, all uppercase', () => {
    const parsedCurrency = parseCurrency('USD');
    expect(parsedCurrency).toEqual(expected);
  });
  test('Currency is valid, mix of uppercase and lowercase', () => {
    const parsedCurrency = parseCurrency('UsD');
    expect(parsedCurrency).toEqual(expected);
  });
  test('Currency is valid, leading spaces, lowercase', () => {
    const parsedCurrency = parseCurrency('   usd');
    expect(parsedCurrency).toEqual(expected);
  });
  test('Currency is valid, leading spaces, uppercase', () => {
    const parsedCurrency = parseCurrency('  USD');
    expect(parsedCurrency).toEqual(expected);
  });
  test('Currency is valid, leading spaces, mixed', () => {
    const parsedCurrency = parseCurrency(' uSd');
    expect(parsedCurrency).toEqual(expected);
  });
  test('Currency is valid, trailing spaces, lowercase', () => {
    const parsedCurrency = parseCurrency('usd ');
    expect(parsedCurrency).toEqual(expected);
  });
  test('Currency is valid, trailing spaces, uppercase', () => {
    const parsedCurrency = parseCurrency('USD  ');
    expect(parsedCurrency).toEqual(expected);
  });
  test('Currency is valid, trailing spaces, mxied', () => {
    const parsedCurrency = parseCurrency('UsD   ');
    expect(parsedCurrency).toEqual(expected);
  });
  test('Currency is valid, leading & trailing spaces, lowercase', () => {
    const parsedCurrency = parseCurrency(' usd   ');
    expect(parsedCurrency).toEqual(expected);
  });
  test('Currency is valid, leading & trailing spaces, uppercase', () => {
    const parsedCurrency = parseCurrency('  USD   ');
    expect(parsedCurrency).toEqual(expected);
  });
  test('Currency is valid, leading & trailing spaces, mixed', () => {
    const parsedCurrency = parseCurrency('        uSD      ');
    expect(parsedCurrency).toEqual(expected);
  });
});
