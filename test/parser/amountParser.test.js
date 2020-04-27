const parseAmount = require('../../src/parser/amountParser');

describe('Amount parser: Invalid amounts', () => {
  test('Amount is not a number', () => {
    const parsedAmount = parseAmount('9asd34ndd');
    expect(parsedAmount).toEqual({error: '[9asd34ndd] is not a number'});
  });
  test('Amount is zero', () => {
    const parsedAmount = parseAmount('0');
    expect(parsedAmount).toEqual({error: '[0] must be greater than zero'});
  });
  test('Amount is negative', () => {
    const parsedAmount = parseAmount('-0.1');
    expect(parsedAmount).toEqual({error: '[-0.1] must be greater than zero'});
  });
  test('Amount is not a number, letters in decimal', () => {
    const parsedAmount = parseAmount('111,111.0F');
    expect(parsedAmount).toEqual({error: '[111,111.0F] is not a number'});
  });
});

describe('Amount parser: Valid amounts', () => {
  test('Amount is a whole number', () => {
    const parsedAmount = parseAmount('99');
    expect(parsedAmount).toEqual({amount: 99});
  });
  test('Amount is a decimal', () => {
    const parsedAmount = parseAmount('0.1');
    expect(parsedAmount).toEqual({amount: 0.1});
  });
  test('Amount contains commas', () => {
    const parsedAmount = parseAmount('999,999,999');
    expect(parsedAmount).toEqual({amount: 999999999});
  });
  test('Amount is decimal and has commas', () => {
    const parsedAmount = parseAmount('999,999,999.012');
    expect(parsedAmount).toEqual({amount: 999999999.012});
  });
});
