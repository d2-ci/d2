'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateSixMonthlyPeriodsForYear = generateSixMonthlyPeriodsForYear;

var _helpers = require('../helpers');

function generateSixMonthlyPeriodsForYear() {
    var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.getCurrentYear)();
    var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
    // eslint-disable-line import/prefer-default-export
    (0, _helpers.validateIfValueIsInteger)(year);

    var monthNames = (0, _helpers.getMonthNamesForLocale)(locale);

    return [{
        startDate: year + '-01-01',
        endDate: year + '-06-30',
        name: monthNames[0] + ' - ' + monthNames[5] + ' ' + year,
        id: year + 'S1'
    }, {
        startDate: year + '-07-01',
        endDate: year + '-12-31',
        name: monthNames[6] + ' - ' + monthNames[11] + ' ' + year,
        id: year + 'S2'
    }];
}
//# sourceMappingURL=six-monthly.js.map