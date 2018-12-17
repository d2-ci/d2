'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateSixMonthlyAprilPeriodsForYear = generateSixMonthlyAprilPeriodsForYear;

var _helpers = require('../helpers');

function generateSixMonthlyAprilPeriodsForYear() {
    var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.getCurrentYear)();
    var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
    // eslint-disable-line import/prefer-default-export
    (0, _helpers.validateIfValueIsInteger)(year);

    var monthNames = (0, _helpers.getMonthNamesForLocale)(locale);
    var periods = [];

    var period = {};
    period.startDate = year + '-04-01';
    period.endDate = year + '-09-30';
    period.name = monthNames[3] + ' - ' + monthNames[8] + ' ' + year;
    period.iso = year + 'AprilS1';
    period.id = period.iso;
    periods.push(period);

    period = {};
    period.startDate = year + '-10-01';
    period.endDate = year + 1 + '-03-31';
    period.name = monthNames[9] + ' ' + year + ' - ' + monthNames[2] + ' ' + (year + 1);
    period.iso = year + 'AprilS2';
    period.id = period.iso;
    periods.push(period);

    return periods;
}
//# sourceMappingURL=six-monthly-april.js.map