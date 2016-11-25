const expect = require('expect');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const { HOURLY_WAGE, EVENING_BONUS_WAGE } = require('app-modules/constants/wage');
const wageFileParser = require('../index');

describe('Wage file parser', () => {

  it('should calculate correct wages for valid file', () => {
    const readStream = fs.createReadStream(path.join(__dirname, 'test-data-valid.csv'));

    return wageFileParser.parseFromReadStream(readStream)
      .then(data => {

        expect(data.length).toBe(3);

        const janet = data.find(person => person.personId === '1');
        const scott = data.find(person => person.personId === '2');
        const larry = data.find(person => person.personId === '3');

        expect(janet).toExist();
        expect(scott).toExist();
        expect(larry).toExist();

        expect(janet.wage).toBe(_.round(7.5 * HOURLY_WAGE, 2));
        expect(scott.wage).toBe(_.round(8 * HOURLY_WAGE + 7.75 * HOURLY_WAGE, 2));
        expect(larry.wage).toBe(_.round(1 * HOURLY_WAGE + 1 * EVENING_BONUS_WAGE, 2));
      });
  });

  it('should return empty result with empty file', () => {
    const readStream = fs.createReadStream(path.join(__dirname, 'test-data-empty.csv'));

    return wageFileParser.parseFromReadStream(readStream)
      .then(data => {
        expect(data.length).toBe(0);
      });
  });

  it('should reject invalid file', () => {
    const readStream = fs.createReadStream(path.join(__dirname, 'test-data-invalid.csv'));

    return wageFileParser.parseFromReadStream(readStream)
      .catch(err => {
        return expect(err).toExist();
      });
  });

});
