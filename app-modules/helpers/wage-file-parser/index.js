const byline = require('byline');
const highland = require('highland');
const moment = require('moment');
const bluebird = require('bluebird');
const _ = require('lodash');

const wageHelper = require('app-modules/helpers/wage');

function attachHours(item) {
  const { date, startHour, startMinute, endHour, endMinute } = item;
  const [day, month, year] = date.split('.');

  const momentDate = moment.utc(date, 'DD.MM.YYYY');
  const startTime = { hour: +startHour, minute: +startMinute };
  const endTime = { hour: +endHour, minute: +endMinute };

  const totalHours = wageHelper.getTotalHours(momentDate, startTime, endTime);
  const eveningHours = wageHelper.getEveningHours(momentDate, startTime, endTime);

  return Object.assign({}, item, { totalHours, eveningHours });
}

function attachWage(item) {
  const { eveningHours, totalHours } = item;

  return Object.assign({}, item, { wage: wageHelper.calculateWage({ totalHours, eveningHours}) });
}

function formatResults({ personIdToPerson, monthYearPersonIdToWageInfo }) {
  return Object.values(monthYearPersonIdToWageInfo)
    .map(wageInfo => {
      const { wage } = wageInfo;

      return Object.assign({}, wageInfo, { wage: _.round(wage || 0, 2) }, personIdToPerson[wageInfo.personId] || {})
    })
    .sort((a, b) => {
      const [monthA, yearA] = a.date.split('.');
      const [monthB, yearB] = b.date.split('.');

      return (+yearB * 365 + +monthB * 30) - (+yearA * 365 + +monthA * 30);
    });
}

function makeWageAggregator() {
  let personIdToPerson = {};
  let monthYearPersonIdToWageInfo = {};

  const push = item => {
    const { date, personId, personName, wage, eveningHours, totalHours } = item;
    const [day, month, year] = date.split('.');

    personIdToPerson[personId] = {
      personId: personId,
      personName: personName
    };

    const key = `${month}.${year}.${personId}`;

    let wageInfo = monthYearPersonIdToWageInfo[key] || {};

    wageInfo.wage = (wageInfo.wage || 0) + wage;
    wageInfo.eveningHours = (wageInfo.eveningHours || 0) + eveningHours;
    wageInfo.totalHours = (wageInfo.totalHours || 0) + totalHours;
    wageInfo.date = `${month}.${year}`;
    wageInfo.personId = personId;

    monthYearPersonIdToWageInfo[key] = wageInfo;
  }

  const value = () => ({
    personIdToPerson,
    monthYearPersonIdToWageInfo
  });

  return {
    push,
    value
  };
}

function parseFromReadStream(readStream) {
  const streamByLine = byline(readStream);

  const wageAggregator = makeWageAggregator();

  return new Promise((resolve, reject) => {
    highland(streamByLine)
      .stopOnError(reject)
      .drop(1)
      .map(line =>  line.toString().split(','))
      .map(line => {
        const [personName, personId, date, start, end] = line;
        const [startHour, startMinute] = start.split(':');
        const [endHour, endMinute] = end.split(':');

        return { personName, personId, date, startHour, startMinute, endHour, endMinute };
      })
      .map(attachHours)
      .map(attachWage)
      .each(wageAggregator.push)
      .done(() => {
        resolve(formatResults(wageAggregator.value()));
      });
  });
}

module.exports = {
  parseFromReadStream
};
