"use strict";

var _daily = require("../daily");

var _helpers = require("../../../../src/period/helpers");

describe('Daily period', function () {
  describe('generateDailyPeriods()', function () {
    it('should return 365 day items for 2017', function () {
      expect((0, _daily.generateDailyPeriodsForYear)(2017)).toHaveLength(365);
    });
    it('should return 366 day items for a leap year (2016)', function () {
      expect((0, _daily.generateDailyPeriodsForYear)(2016)).toHaveLength(366);
    });
    it('should have the expected format for each period', function () {
      var periods = (0, _daily.generateDailyPeriodsForYear)(2017);
      expect(periods[0]).toEqual({
        startDate: '2017-01-01',
        endDate: '2017-01-01',
        name: 'January 1, 2017',
        id: '20170101'
      });
    });
    it('should not allow years before the year zero', function () {
      expect(function () {
        return (0, _daily.generateDailyPeriodsForYear)(-10);
      }).toThrowError();
    });
    it('should throw an error when passing a Date object', function () {
      expect(function () {
        return (0, _daily.generateDailyPeriodsForYear)(new Date());
      }).toThrowError();
    });
    it('should generate the same periods when called without as when called with the current year', function () {
      expect((0, _daily.generateDailyPeriodsForYear)()).toEqual((0, _daily.generateDailyPeriodsForYear)((0, _helpers.getCurrentYear)()));
    });
  });
});
//# sourceMappingURL=daily_spec.js.map