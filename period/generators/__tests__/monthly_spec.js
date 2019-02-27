"use strict";

var _monthly = require("../monthly");

describe('Monthly period', function () {
  describe('generateMonthlyPeriodsForYear()', function () {
    it('should not allow years before the year zero', function () {
      expect(function () {
        return (0, _monthly.generateMonthlyPeriodsForYear)(-10);
      }).toThrowError();
    });
    it('should throw an error when passing a Date object', function () {
      expect(function () {
        return (0, _monthly.generateMonthlyPeriodsForYear)(new Date());
      }).toThrowError();
    });
    it('should return 12 monthly periods for 2017', function () {
      expect((0, _monthly.generateMonthlyPeriodsForYear)()).toHaveLength(12);
    });
    it('should return the correct content for each period', function () {
      var monthlyPeriods = (0, _monthly.generateMonthlyPeriodsForYear)(2017);
      expect(monthlyPeriods[0]).toEqual({
        startDate: '2017-01-01',
        endDate: '2017-01-31',
        name: 'January 2017',
        id: '201701'
      });
    });
    it('should generate the same periods when called without as when called with the current year', function () {
      expect((0, _monthly.generateMonthlyPeriodsForYear)()).toEqual((0, _monthly.generateMonthlyPeriodsForYear)(new Date().getFullYear()));
    });
  });
});
//# sourceMappingURL=monthly_spec.js.map