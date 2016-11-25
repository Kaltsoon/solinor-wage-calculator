const expect = require('expect');
const moment = require('moment');

const { HOURLY_WAGE, EVENING_BONUS_WAGE } = require('app-modules/constants/wage');
const wageHelper = require('../index');

describe('Wages', () => {

  it('should calculate evening hours correctly', () => {
    const date = moment.utc('11.11.2011', 'DD.MM.YYYY');

    expect(
      wageHelper.getEveningHours(
        date,
        { hour: 8, minute: 0 },
        { hour: 16, minute: 0 }
      )
    ).toBe(0);

    expect(
      wageHelper.getEveningHours(
        date,
        { hour: 17, minute: 30 },
        { hour: 2, minute: 15 }
      )
    ).toBe(8.25);

    expect(
      wageHelper.getEveningHours(
        date,
        { hour: 18, minute: 45 },
        { hour: 6, minute: 0 }
      )
    ).toBe(11.25);
  });

  it('should calculate total hours correctly', () => {
    const date = moment.utc('11.11.2011', 'DD.MM.YYYY');

    expect(
      wageHelper.getTotalHours(
        date,
        { hour: 8, minute: 45 },
        { hour: 16, minute: 30 }
      )
    ).toBe(7.75);

    expect(
      wageHelper.getTotalHours(
        date,
        { hour: 9, minute: 30 },
        { hour: 2, minute: 15 }
      )
    ).toBe(16.75);
  });

  it('should caculate wage correctly', () => {
    const HOURLY_WAGE = 3.75;
    const EVENING_BONUS_WAGE = 1.15;

    expect(
      wageHelper.calculateWage({
        eveningHours: 0,
        totalHours: 7
      })
    ).toBe(HOURLY_WAGE * 7);

    expect(
      wageHelper.calculateWage({
        eveningHours: 5,
        totalHours: 8
      })
    ).toBe(HOURLY_WAGE * 8 + 5 * EVENING_BONUS_WAGE);

    expect(
      wageHelper.calculateWage({
        eveningHours: 2,
        totalHours: 9
      })
    ).toBe(HOURLY_WAGE * 8 + 2 * EVENING_BONUS_WAGE + 1 * HOURLY_WAGE * 1.25);

    expect(
      wageHelper.calculateWage({
        eveningHours: 0,
        totalHours: 11
      })
    ).toBe(HOURLY_WAGE * 8 + 3 * HOURLY_WAGE * 1.5);

    expect(
      wageHelper.calculateWage({
        eveningHours: 0,
        totalHours: 13
      })
    ).toBe(HOURLY_WAGE * 8 + 5 * HOURLY_WAGE * 2);
  });
});
