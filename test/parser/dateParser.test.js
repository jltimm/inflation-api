const dateParser = require('../../src/parser/dateParser');

describe('Date parser: Invalid dates', () => {
  test('Does not contain \'-\'', () => {
    const date = dateParser.parseDate('2020/02');
    expect(date).toEqual(null);
  });
  test('Month greater than 12', () => {
    const date = dateParser.parseDate('2020-13');
    expect(date).toEqual(null);
  });
  test('Month less than 1', () => {
    const date = dateParser.parseDate('2020-00');
    expect(date).toEqual(null);
  });
  test('Year is not valid', () => {
    const date = dateParser.parseDate('bad-01');
    expect(date).toEqual(null);
  });
  test('Month is not valid', () => {
    const date = dateParser.parseDate('2020-bad');
    expect(date).toEqual(null);
  });
  test('Year is zero (no such thing as year 0!)', () => {
    const date = dateParser.parseDate('0000-12');
    expect(date).toEqual(null);
  });
  test('Year is negative zero', () => {
    const date = dateParser.parseDate('-0-01');
    expect(date).toEqual(null);
  });
});

describe('Date parser: Valid dates', () => {
  test('Normal date', () => {
    const date = dateParser.parseDate('2020-12');
    expect(date).toEqual({year: 2020, month: 12});
  });
  test('Negative year', () => {
    const date = dateParser.parseDate('-2020-12');
    expect(date).toEqual({year: -2020, month: 12});
  });
  test('Month is one digit', () => {
    const date = dateParser.parseDate('2020-1');
    expect(date).toEqual({year: 2020, month: 1});
  });
  test('Month has leading zero', () => {
    const date = dateParser.parseDate('2020-01');
    expect(date).toEqual({year: 2020, month: 1});
  });
  test('Year has leading zero, non-negative', () => {
    const date = dateParser.parseDate('0765-12');
    expect(date).toEqual({year: 765, month: 12});
  });
  test('Year has leading zero, is negative', () => {
    const date = dateParser.parseDate('-0123-12');
    expect(date).toEqual({year: -123, month: 12});
  });
  test('Year and month both one digit', () => {
    const date = dateParser.parseDate('1-1');
    expect(date).toEqual({year: 1, month: 1});
  });
});
