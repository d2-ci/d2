"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatAsISODate = formatAsISODate;
exports.filterFuturePeriods = filterFuturePeriods;
exports.getYYYYMM = getYYYYMM;
exports.getBiMonthlyId = getBiMonthlyId;
exports.validateIfValueIsInteger = validateIfValueIsInteger;
exports.getCurrentYear = getCurrentYear;
exports.is53WeekISOYear = is53WeekISOYear;
exports.addDays = addDays;
exports.addMonths = addMonths;
exports.subtractDays = subtractDays;
exports.getFirstDayInFirstISOWeekForYear = getFirstDayInFirstISOWeekForYear;
exports.getLastDayOfTheWeekForFirstDayOfTheWeek = getLastDayOfTheWeekForFirstDayOfTheWeek;
exports.getMonthNamesForLocale = getMonthNamesForLocale;
exports.getLastDateOfMonth = getLastDateOfMonth;
exports.getFirstDateOfQuarter = getFirstDateOfQuarter;
exports.getLastDateOfQuarter = getLastDateOfQuarter;
exports.getFirstDateOfWeek = getFirstDateOfWeek;

var _check = require("../lib/check");

function formatAsISODate(date) {
  if (!(date instanceof Date)) {
    throw new Error('formatAsISODate(date) only accepts Date objects');
  }

  var y = date.getFullYear();
  var m = "0".concat(date.getMonth() + 1).substr(-2);
  var d = "0".concat(date.getDate()).substr(-2);
  return "".concat(y, "-").concat(m, "-").concat(d);
}

function filterFuturePeriods(periods) {
  var array = [];
  var now = new Date();

  for (var i = 0; i < periods.length; i++) {
    if (new Date(periods[i].startDate) <= now) {
      array.push(periods[i]);
    }
  }

  return array;
}

function getYYYYMM(date) {
  var y = date.getFullYear();
  var m = "".concat(date.getMonth() + 1);
  m = "0".concat(m).substr(-2);
  return y + m;
}

function getBiMonthlyId(date) {
  var y = date.getFullYear();
  var m = "0".concat(Math.floor(date.getMonth() / 2) + 1).substr(-2);
  return "".concat(y + m, "B");
}

function validateIfValueIsInteger(year) {
  if (!(0, _check.isInteger)(year)) {
    throw new Error('Generator should be called with an integer to identify the year.' + ' Perhaps you passed a Date object?');
  }

  if (year < 0) {
    throw new Error('Generator does not support generating year before the year 0.');
  }
}

function getCurrentYear() {
  return new Date().getFullYear();
}

function is53WeekISOYear(year) {
  var p = function p(y) {
    return y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);
  };

  return p(year) % 7 === 4 || p(year - 1) % 7 === 3;
}

function addDays(days, date) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function addMonths(months, date) {
  var result = new Date(date);
  result.setMonth(date.getMonth() + months);
  return result;
}

function subtractDays(days, date) {
  return addDays(-days, date);
}

function getFirstDayInFirstISOWeekForYear(year) {
  // The first ISO week of the year always contains 4th January. We can use this as a pointer to start the first week.
  var startDate = new Date(year, 0, 4); // January 4th might not be at the start of the week. Therefore we rewind to the start of the week.

  if (startDate.getDay() === 0) {
    startDate = subtractDays(6, startDate); // If January 4th is on a Sunday we'll revert back 6 days
  } else {
    // We'll revert back the current day number of days - 1 (Due to the days being 0 indexed with 0 being Sunday)
    var daysAfterMonday = startDate.getDay() - 1;
    startDate = subtractDays(daysAfterMonday, startDate);
  }

  return startDate;
}

function getLastDayOfTheWeekForFirstDayOfTheWeek(startDate) {
  var endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);
  return endDate;
}

function getMonthNamesForLocale(locale) {
  var monthNames = [];

  for (var i = 0; i < 12; i += 1) {
    var monthName = new Date(2000, i, 1).toLocaleDateString(locale, {
      month: 'long'
    });
    monthNames.push(monthName);
  }

  return monthNames;
}

function getLastDateOfMonth(year, month) {
  return new Date(new Date(year, month + 1).setDate(0));
}

function getFirstDateOfQuarter(year, quarter) {
  var startMonth = (quarter - 1) * 3;
  return new Date(year, startMonth);
}

function getLastDateOfQuarter(year, quarter) {
  return new Date(getFirstDateOfQuarter(year, quarter + 1).setDate(0));
}

var ordTable = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
var ordTableLeap = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];

function getFirstDateOfWeek(year, week) {
  var isLeapYear = new Date(new Date(year, 2, 1).setDate(0)).getDate() === 29;
  var ordDiff = isLeapYear ? ordTableLeap : ordTable;
  var correction = (new Date(year, 0, 4).getDay() || 7) + 3;
  var ordDate = week * 7 + (1 - correction);

  if (ordDate < 0) {
    return new Date(year, 0, ordDate);
  }

  var month = 11;

  while (ordDate < ordDiff[month]) {
    month--; // eslint-disable-line
  }

  return new Date(year, month, ordDate - ordDiff[month]);
}
//# sourceMappingURL=helpers.js.map