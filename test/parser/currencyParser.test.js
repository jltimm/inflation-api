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
  const expectedUSD = {currency: 'usd'};
  const expectedCAD = {currency: 'cad'};
  test('Currency is valid, USD, all lowercase', () => {
    const parsedCurrency = parseCurrency('usd');
    expect(parsedCurrency).toEqual(expectedUSD);
  });
  test('Currency is valid, CAD, all lowercase', () => {
    const parsedCurrency = parseCurrency('cad');
    expect(parsedCurrency).toEqual(expectedCAD);
  });
  test('Currency is valid, USD, all uppercase', () => {
    const parsedCurrency = parseCurrency('USD');
    expect(parsedCurrency).toEqual(expectedUSD);
  });
  test('Currency is valid, CAD, all uppercase', () => {
    const parsedCurrency = parseCurrency('CAD');
    expect(parsedCurrency).toEqual(expectedCAD);
  });
  test('Currency is valid, USD, mix of uppercase and lowercase', () => {
    const parsedCurrency = parseCurrency('UsD');
    expect(parsedCurrency).toEqual(expectedUSD);
  });
  test('Currency is valid, CAD, mix of uppercase and lowercase', () => {
    const parsedCurrency = parseCurrency('CaD');
    expect(parsedCurrency).toEqual(expectedCAD);
  });
  test('Currency is valid, USD, leading spaces, lowercase', () => {
    const parsedCurrency = parseCurrency('   usd');
    expect(parsedCurrency).toEqual(expectedUSD);
  });
  test('Currency is valid, CAD, leading spaces, lowercase', () => {
    const parsedCurrency = parseCurrency('   cad');
    expect(parsedCurrency).toEqual(expectedCAD);
  });
  test('Currency is valid, USD, leading spaces, uppercase', () => {
    const parsedCurrency = parseCurrency('  USD');
    expect(parsedCurrency).toEqual(expectedUSD);
  });
  test('Currency is valid, CAD, leading spaces, uppercase', () => {
    const parsedCurrency = parseCurrency('  CAD');
    expect(parsedCurrency).toEqual(expectedCAD);
  });
  test('Currency is valid, USD, leading spaces, mixed', () => {
    const parsedCurrency = parseCurrency(' uSd');
    expect(parsedCurrency).toEqual(expectedUSD);
  });
  test('Currency is valid, CAD, leading spaces, mixed', () => {
    const parsedCurrency = parseCurrency(' cAd');
    expect(parsedCurrency).toEqual(expectedCAD);
  });
  test('Currency is valid, USD, trailing spaces, lowercase', () => {
    const parsedCurrency = parseCurrency('usd ');
    expect(parsedCurrency).toEqual(expectedUSD);
  });
  test('Currency is valid, CAD, trailing spaces, lowercase', () => {
    const parsedCurrency = parseCurrency('cad ');
    expect(parsedCurrency).toEqual(expectedCAD);
  });
  test('Currency is valid, USD, trailing spaces, uppercase', () => {
    const parsedCurrency = parseCurrency('USD  ');
    expect(parsedCurrency).toEqual(expectedUSD);
  });
  test('Currency is valid, CAD, trailing spaces, uppercase', () => {
    const parsedCurrency = parseCurrency('CAD  ');
    expect(parsedCurrency).toEqual(expectedCAD);
  });
  test('Currency is valid, USD, trailing spaces, mxied', () => {
    const parsedCurrency = parseCurrency('UsD   ');
    expect(parsedCurrency).toEqual(expectedUSD);
  });
  test('Currency is valid, CAD, trailing spaces, mxied', () => {
    const parsedCurrency = parseCurrency('CaD   ');
    expect(parsedCurrency).toEqual(expectedCAD);
  });
  test('Currency is valid, USD, leading & trailing spaces, lowercase', () => {
    const parsedCurrency = parseCurrency(' usd   ');
    expect(parsedCurrency).toEqual(expectedUSD);
  });
  test('Currency is valid, CAD, leading & trailing spaces, lowercase', () => {
    const parsedCurrency = parseCurrency(' cad   ');
    expect(parsedCurrency).toEqual(expectedCAD);
  });
  test('Currency is valid, USD, leading & trailing spaces, uppercase', () => {
    const parsedCurrency = parseCurrency('  USD   ');
    expect(parsedCurrency).toEqual(expectedUSD);
  });
  test('Currency is valid, CAD, leading & trailing spaces, uppercase', () => {
    const parsedCurrency = parseCurrency('  CAD   ');
    expect(parsedCurrency).toEqual(expectedCAD);
  });
  test('Currency is valid, USD, leading & trailing spaces, mixed', () => {
    const parsedCurrency = parseCurrency('        uSD      ');
    expect(parsedCurrency).toEqual(expectedUSD);
  });
  test('Currency is valid, CAD, leading & trailing spaces, mixed', () => {
    const parsedCurrency = parseCurrency('        cAD      ');
    expect(parsedCurrency).toEqual(expectedCAD);
  });
});
