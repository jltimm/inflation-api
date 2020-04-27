const parseDate = require('../../src/parser/dateParser');

describe('Date parser: Invalid dates', () => {
  test('Does not contain \'-\'', () => {
    const date = parseDate('2020/02');
    expect(date).toEqual({error: '[2020/02] must be of the form YYYY-MM'});
  });
  test('Month greater than 12', () => {
    const date = parseDate('2020-13');
    expect(date).toEqual({error: '[2020-13] month must be between 1 and 12'});
  });
  test('Month less than 1', () => {
    const date = parseDate('2020-00');
    expect(date).toEqual({error: '[2020-00] month must be between 1 and 12'});
  });
  test('Year is not valid', () => {
    const date = parseDate('bad-01');
    expect(date).toEqual({error: '[bad-01] contains invalid characters'});
  });
  test('Month is not valid', () => {
    const date = parseDate('2020-bad');
    expect(date).toEqual({error: '[2020-bad] contains invalid characters'});
  });
  test('Year is zero (no such thing as year 0!)', () => {
    const date = parseDate('0000-12');
    expect(date).toEqual({error: '[0000-12] year must not be zero'});
  });
  test('Year is negative zero', () => {
    const date = parseDate('-0-01');
    expect(date).toEqual({error: '[-0-01] year must not be zero'});
  });
});

describe('Date parser: Valid dates', () => {
  test('Normal date', () => {
    const date = parseDate('2020-12');
    expect(date).toEqual({year: 2020, month: 12});
  });
  test('Negative year', () => {
    const date = parseDate('-2020-12');
    expect(date).toEqual({year: -2020, month: 12});
  });
  test('Month is one digit', () => {
    const date = parseDate('2020-1');
    expect(date).toEqual({year: 2020, month: 1});
  });
  test('Month has leading zero', () => {
    const date = parseDate('2020-01');
    expect(date).toEqual({year: 2020, month: 1});
  });
  test('Year has leading zero, non-negative', () => {
    const date = parseDate('0765-12');
    expect(date).toEqual({year: 765, month: 12});
  });
  test('Year has leading zero, is negative', () => {
    const date = parseDate('-0123-12');
    expect(date).toEqual({year: -123, month: 12});
  });
  test('Year and month both one digit', () => {
    const date = parseDate('1-1');
    expect(date).toEqual({year: 1, month: 1});
  });
});
