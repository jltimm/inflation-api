const parseDate = require('../../src/parser/dateParser');

describe('Date parser: Invalid dates', () => {
  test('4 arguments given', () => {
    const date = parseDate('2020-02-01-01');
    expect(date).toEqual(
        {error: '[2020-02-01-01] must be of the form ' +
                'YYYY-MM-DD, YYYY-MM, or YYYY'},
    );
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
  test('Month/day combination is invalid: 32 days', () => {
    const date = parseDate('2019-01-32');
    expect(date).toEqual({
      error: '[2019-01-32] has an invalid day for the given month and year',
    });
  });
  test('Month/day combination is invalid: 29 days, not a leap year', () => {
    const date = parseDate('1900-02-29');
    expect(date).toEqual({
      error: '[1900-02-29] has an invalid day for the given month and year',
    });
  });
  test('Month/day combination is invalid: month does not have 31 days', () => {
    const date = parseDate('2016-06-31');
    expect(date).toEqual({
      error: '[2016-06-31] has an invalid day for the given month and year',
    });
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
  test('Optional month param not present', () => {
    const date = parseDate('2019');
    expect(date).toEqual({year: 2019});
  });
  test('Year/month/day is valid', () => {
    const date = parseDate('2016-01-31');
    expect(date).toEqual({year: 2016, month: 1, day: 31});
  });
  test('Date is leap year', () => {
    const date = parseDate('2016-02-29');
    expect(date).toEqual({year: 2016, month: 2, day: 29});
  });
  test('Date is leap year, 2000', () => {
    const date = parseDate('2000-02-29');
    expect(date).toEqual({year: 2000, month: 2, day: 29});
  });
  test('Normal year/month/date', () => {
    const date = parseDate('2020-05-06');
    expect(date).toEqual({year: 2020, month: 5, day: 6});
  });
});
