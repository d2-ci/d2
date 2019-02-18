'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPeriodFromPeriodId = getPeriodFromPeriodId;

var _helpers = require('./helpers');

var _formatters = require('./formatters');

var periodTypeRegex = {
    Daily: /^([0-9]{4})([0-9]{2})([0-9]{2})$/, // YYYYMMDD
    Weekly: /^([0-9]{4})()W([0-9]{1,2})$/, // YYYY"W"[1-53]
    WeeklyWednesday: /^([0-9]{4})(Wed)W([0-9]{1,2})$/, // YYYY"WedW"[1-53]
    WeeklyThursday: /^([0-9]{4})(Thu)W([0-9]{1,2})$/, // YYYY"ThuW"[1-53]
    WeeklySaturday: /^([0-9]{4})(Sat)W([0-9]{1,2})$/, // YYYY"SatW"[1-53]
    WeeklySunday: /^([0-9]{4})(Sun)W([0-9]{1,2})$/, // YYYY"SunW"[1-53]
    BiWeekly: /^([0-9]{4})BiW([0-9]{1,2})$/, // YYYY"BiW"[1-27]
    Monthly: /^([0-9]{4})([0-9]{2})$/, // YYYYMM
    BiMonthly: /^([0-9]{4})([0-9]{2})B$/, // YYYY0[1-6]"B"
    Quarterly: /^([0-9]{4})Q([1234])$/, // YYYY"Q"[1-4]
    SixMonthly: /^([0-9]{4})S([12])$/, // YYYY"S"[1/2]
    SixMonthlyApril: /^([0-9]{4})AprilS([12])$/, // YYYY"AprilS"[1/2]
    Yearly: /^([0-9]{4})$/, // YYYY
    FinancialApril: /^([0-9]{4})April$/, // YYYY"April"
    FinancialJuly: /^([0-9]{4})July$/, // YYYY"July"
    FinancialOct: /^([0-9]{4})Oct$/ // YYYY"Oct"
};

/* eslint-disable complexity */
var weeklyMatcherParser = function weeklyMatcherParser(match) {
    var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';

    var year = parseInt(match[1], 10);
    var weekType = match[2];
    var week = parseInt(match[3], 10);

    if (week < 1 || week > 53) {
        throw new Error('Invalid week number');
    }

    var weekTypeDiff = 0;
    switch (weekType) {
        case 'Wed':
            weekTypeDiff = 2;break;
        case 'Thu':
            weekTypeDiff = 3;break;
        case 'Sat':
            weekTypeDiff = -2;break;
        case 'Sun':
            weekTypeDiff = -1;break;
        default:
            break;
    }

    var p = (0, _helpers.computeWeekBasedPeriod)({ year: year, week: week, locale: locale, weekTypeDiff: weekTypeDiff });

    var name = p.startMonthName === p.endMonthName ? p.year + ' W' + p.week + ' ' + p.startMonthName + ' ' + p.startDayNum + ' - ' + p.endDayNum : p.year + ' W' + p.week + ' ' + p.startMonthName + ' ' + p.startDayNum + ' - ' + p.endMonthName + ' ' + p.endDayNum;

    return {
        id: '' + p.year + weekType + 'W' + p.week,
        name: name,
        startDate: p.startDate,
        endDate: p.endDate
    };
};

var isValidDailyPeriod = function isValidDailyPeriod(month, year, day) {
    return month > 11 || month < 0 || day > 31 || day < 1 || year < 1000 || year > 5000;
};
/* eslint-enable */

var regexMatchToPeriod = {
    Daily: function Daily(match) {
        var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';

        var year = parseInt(match[1], 10);
        var month = parseInt(match[2], 10) - 1;
        var day = parseInt(match[3], 10);
        if (isValidDailyPeriod(month, year, day)) {
            throw new Error('Invalid Daily period');
        }
        var date = new Date(match[1], match[2] - 1, match[3]);
        return {
            id: '' + date.getFullYear() + ('0' + (date.getMonth() + 1)).substr(-2) + ('0' + date.getDate()).substr(-2),
            name: (0, _formatters.toLocaleDayFormat)(date, locale),
            startDate: (0, _helpers.formatAsISODate)(date),
            endDate: (0, _helpers.formatAsISODate)(date)
        };
    },
    Weekly: weeklyMatcherParser,
    WeeklyWednesday: weeklyMatcherParser,
    WeeklyThursday: weeklyMatcherParser,
    WeeklySaturday: weeklyMatcherParser,
    WeeklySunday: weeklyMatcherParser,
    BiWeekly: function BiWeekly(match) {
        var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';

        var year = parseInt(match[1], 10);
        var biWeek = parseInt(match[2], 10);

        if (biWeek < 1 || biWeek > 27) {
            throw new Error('Invalid BiWeek number');
        }

        var week = biWeek * 2 - 1;
        var p = (0, _helpers.computeWeekBasedPeriod)({ year: year, week: week, locale: locale, periodLength: 13 });
        biWeek = (p.week + 1) / 2;

        var name = p.startMonthName === p.endMonthName ? p.year + ' BiWeek ' + biWeek + ' ' + p.startMonthName + ' ' + p.startDayNum + ' - ' + p.endDayNum : p.year + ' BiWeek ' + biWeek + ' ' + p.startMonthName + ' ' + p.startDayNum + ' - ' + p.endMonthName + ' ' + p.endDayNum;

        return {
            id: p.year + 'BiW' + biWeek,
            name: name,
            startDate: p.startDate,
            endDate: p.endDate
        };
    },
    Monthly: function Monthly(match) {
        var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';

        var id = match[0];
        var year = parseInt(match[1], 10);
        var month = parseInt(match[2], 10) - 1;
        if (month > 11 || month < 0) {
            throw new Error('Invalid month number');
        }
        var monthNum = ('0' + (month + 1)).substr(-2);
        var monthNames = (0, _helpers.getMonthNamesForLocale)(locale);
        var lastDay = (0, _helpers.getLastDateOfMonth)(year, month);
        return {
            id: id,
            name: monthNames[month] + ' ' + year,
            startDate: year + '-' + monthNum + '-01',
            endDate: (0, _helpers.formatAsISODate)(lastDay)
        };
    },
    BiMonthly: function BiMonthly(match) {
        var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';

        var id = match[0];
        var year = parseInt(match[1], 10);
        var biMonth = parseInt(match[2], 10);
        if (biMonth < 1 || biMonth > 6) {
            throw new Error('Invalid BiMonth number');
        }
        var startMonth = (biMonth - 1) * 2;
        var startMonthNum = ('0' + (startMonth + 1)).substr(-2);
        var endMonth = startMonth + 1;
        var monthNames = (0, _helpers.getMonthNamesForLocale)(locale);
        return {
            id: id,
            name: monthNames[startMonth] + ' - ' + monthNames[endMonth] + ' ' + year,
            startDate: year + '-' + startMonthNum + '-01',
            endDate: (0, _helpers.formatAsISODate)((0, _helpers.getLastDateOfMonth)(year, endMonth))
        };
    },
    Quarterly: function Quarterly(match) {
        var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';

        var id = match[0];
        var year = parseInt(match[1], 10);
        var quarter = parseInt(match[2], 10);
        var startMonth = (quarter - 1) * 3;
        var endMonth = quarter * 3 - 1;
        var monthNames = (0, _helpers.getMonthNamesForLocale)(locale);
        return {
            id: id,
            name: monthNames[startMonth] + ' - ' + monthNames[endMonth] + ' ' + year,
            startDate: (0, _helpers.formatAsISODate)((0, _helpers.getFirstDateOfQuarter)(year, quarter)),
            endDate: (0, _helpers.formatAsISODate)((0, _helpers.getLastDateOfQuarter)(year, quarter))
        };
    },
    SixMonthly: function SixMonthly(match) {
        var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';

        var id = match[0];
        var year = match[1];
        var s = parseInt(match[2], 10) - 1;
        var startMonth = 6 * s;
        var endMonth = 6 * s + 6;
        var endMonthNum = ('0' + endMonth).substr(-2);
        var monthNames = (0, _helpers.getMonthNamesForLocale)(locale);
        return {
            id: id,
            name: monthNames[startMonth] + ' - ' + monthNames[endMonth - 1] + ' ' + year,
            startDate: year + '-0' + (startMonth + 1) + '-01',
            endDate: year + '-' + endMonthNum + '-' + (s === 0 ? '30' : '31')
        };
    },
    SixMonthlyApril: function SixMonthlyApril(match) {
        var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';

        var id = match[0];
        var year = parseInt(match[1], 10);
        var s = parseInt(match[2], 10) - 1;
        var startMonth = s === 0 ? 4 : 10;
        var startMonthNum = ('0' + startMonth).substr(-2);
        var endMonth = s === 0 ? 9 : 3;
        var endMonthNum = ('0' + endMonth).substr(-2);
        var monthNames = (0, _helpers.getMonthNamesForLocale)(locale);
        return {
            id: id,
            name: s === 0 ? monthNames[startMonth - 1] + ' - ' + monthNames[endMonth - 1] + ' ' + year : monthNames[startMonth - 1] + ' ' + year + ' - ' + monthNames[endMonth - 1] + ' ' + (year + 1),
            startDate: year + '-' + startMonthNum + '-01',
            endDate: year + s + '-' + endMonthNum + '-' + (s === 0 ? '30' : '31')
        };
    },
    Yearly: function Yearly(match) {
        return {
            id: match[0],
            name: match[1],
            startDate: match[1] + '-01-01',
            endDate: match[1] + '-12-31'
        };
    },
    FinancialApril: function FinancialApril(match) {
        var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';

        var year = parseInt(match[1], 10);
        var monthNames = (0, _helpers.getMonthNamesForLocale)(locale);
        return {
            id: match[0],
            name: monthNames[3] + ' ' + year + ' - ' + monthNames[2] + ' ' + (year + 1),
            startDate: year + '-04-01',
            endDate: year + 1 + '-03-31'
        };
    },
    FinancialJuly: function FinancialJuly(match) {
        var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';

        var year = parseInt(match[1], 10);
        var monthNames = (0, _helpers.getMonthNamesForLocale)(locale);
        return {
            id: match[0],
            name: monthNames[6] + ' ' + year + ' - ' + monthNames[5] + ' ' + (year + 1),
            startDate: year + '-07-01',
            endDate: year + 1 + '-06-30'
        };
    },
    FinancialOct: function FinancialOct(match) {
        var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';

        var year = parseInt(match[1], 10);
        var monthNames = (0, _helpers.getMonthNamesForLocale)(locale);
        return {
            id: match[0],
            name: monthNames[9] + ' ' + year + ' - ' + monthNames[8] + ' ' + (year + 1),
            startDate: year + '-10-01',
            endDate: year + 1 + '-09-30'
        };
    }
};

function getPeriodFromPeriodId(periodId) {
    var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';

    var period = Object.keys(periodTypeRegex).filter(function (periodType) {
        return periodTypeRegex[periodType].test(periodId) && regexMatchToPeriod.hasOwnProperty(periodType);
    }).map(function (periodType) {
        return regexMatchToPeriod[periodType](periodId.match(periodTypeRegex[periodType]), locale);
    })[0];

    if (!period) {
        throw new Error('Invalid period format');
    }

    return period;
}

exports.default = getPeriodFromPeriodId;
//# sourceMappingURL=parser.js.map