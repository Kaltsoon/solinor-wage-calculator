const moment = require('moment');

require('moment-range');

const { HOURLY_WAGE, EVENING_BONUS_WAGE } = require('app-modules/constants/wage');

function getEveningHours(date, start, end) {
  const eveningRange = moment.range(
    date.clone().set('hour', 18),
    date.clone().add(1, 'days').set('hour', 6)
  );

  const endDate = end.hour < start.hour ? date.clone().add(1, 'days') : date.clone();

  const workingRange = moment.range(
    date.clone().set('hour', start.hour).set('minute', start.minute),
    endDate.set('hour', end.hour).set('minute', end.minute)
  );

  const intersection = eveningRange.intersect(workingRange);

  return intersection
    ? intersection.valueOf() / (60 * 60 * 1000)
    : 0;
}

function getTotalHours(date, start, end) {
  const startDate = date.clone().set('hour', start.hour).set('minute', start.minute);

  let endDate = end.hour < start.hour
    ? date.clone().add(1, 'days')
    : date.clone();

  endDate = endDate.set('hour', end.hour).set('minute', end.minute);

  return Math.abs(startDate.diff(endDate, 'minutes')) / 60;
}

function calculateWage({ totalHours, eveningHours }) {
  const overtimeHours = totalHours - 8;

  let overtimeCompensationPercent = 0;

  if(overtimeHours > 0 && overtimeHours <= 2) {
    overtimeCompensationPercent = 1.25;
  } else if(overtimeHours > 2 && overtimeHours <= 4) {
    overtimeCompensationPercent = 1.5;
  } else if(overtimeHours > 4) {
    overtimeCompensationPercent = 2;
  }

  const overtimeCompensation = overtimeHours * overtimeCompensationPercent * HOURLY_WAGE;
  const regularCompensation = Math.min(totalHours - overtimeHours, totalHours) * HOURLY_WAGE;
  const eveningCompensation = eveningHours * EVENING_BONUS_WAGE;

  return overtimeCompensation + regularCompensation + eveningCompensation;
}

module.exports = {
  getEveningHours,
  getTotalHours,
  calculateWage
}
