"use strict";

var _weekly = require("../weekly");

describe('Weekly period', function () {
  describe('generateWeeklyPeriodsForYear()', function () {
    it('should generate 52 periods for the year 2017', function () {
      expect((0, _weekly.generateWeeklyPeriodsForYear)(2017)).toHaveLength(52);
    });
    it('should generate 53 periods for common years starting on Thursday', function () {
      // https://en.wikipedia.org/wiki/Common_year_starting_on_Thursday
      expect((0, _weekly.generateWeeklyPeriodsForYear)(1705)).toHaveLength(53);
      expect((0, _weekly.generateWeeklyPeriodsForYear)(2009)).toHaveLength(53);
      expect((0, _weekly.generateWeeklyPeriodsForYear)(2015)).toHaveLength(53);
      expect((0, _weekly.generateWeeklyPeriodsForYear)(2026)).toHaveLength(53);
      expect((0, _weekly.generateWeeklyPeriodsForYear)(2099)).toHaveLength(53);
    });
    it('should generate 53 periods for leap years starting on Thursday', function () {
      // https://en.wikipedia.org/wiki/Leap_year_starting_on_Thursday
      expect((0, _weekly.generateWeeklyPeriodsForYear)(1948)).toHaveLength(53);
      expect((0, _weekly.generateWeeklyPeriodsForYear)(1976)).toHaveLength(53);
      expect((0, _weekly.generateWeeklyPeriodsForYear)(2004)).toHaveLength(53);
      expect((0, _weekly.generateWeeklyPeriodsForYear)(2032)).toHaveLength(53);
      expect((0, _weekly.generateWeeklyPeriodsForYear)(2060)).toHaveLength(53);
    });
    it('should generate 53 periods for leap years starting on Wednesday', function () {
      // https://en.wikipedia.org/wiki/Leap_year_starting_on_Wednesday
      expect((0, _weekly.generateWeeklyPeriodsForYear)(1936)).toHaveLength(53);
      expect((0, _weekly.generateWeeklyPeriodsForYear)(1964)).toHaveLength(53);
      expect((0, _weekly.generateWeeklyPeriodsForYear)(1992)).toHaveLength(53);
      expect((0, _weekly.generateWeeklyPeriodsForYear)(2020)).toHaveLength(53);
      expect((0, _weekly.generateWeeklyPeriodsForYear)(2048)).toHaveLength(53);
    });
    it('should generate 52 periods for the year 2016', function () {
      expect((0, _weekly.generateWeeklyPeriodsForYear)(2016)).toHaveLength(52);
    });
    it('should generate the correct result for each period', function () {
      var periods = (0, _weekly.generateWeeklyPeriodsForYear)(2017);
      expect(periods[0]).toEqual({
        startDate: '2017-01-02',
        endDate: '2017-01-08',
        name: 'W1 - 2017-01-02 - 2017-01-08',
        id: '2017W1'
      });
    });
    it('should start the first week of 2015 in the previous year', function () {
      var weeksFor2015 = (0, _weekly.generateWeeklyPeriodsForYear)(2015);
      expect(weeksFor2015[0]).toEqual({
        startDate: '2014-12-29',
        endDate: '2015-01-04',
        name: 'W1 - 2014-12-29 - 2015-01-04',
        id: '2015W1'
      });
    });
    it('should return the correct first week for 2014', function () {
      var weeksFor2014 = (0, _weekly.generateWeeklyPeriodsForYear)(2014);
      expect(weeksFor2014[0]).toEqual({
        startDate: '2013-12-30',
        endDate: '2014-01-05',
        name: 'W1 - 2013-12-30 - 2014-01-05',
        id: '2014W1'
      });
    });
    it('should return the correct first week for 2004', function () {
      var weeksFor2004 = (0, _weekly.generateWeeklyPeriodsForYear)(2004);
      expect(weeksFor2004[0]).toEqual({
        startDate: '2003-12-29',
        endDate: '2004-01-04',
        name: 'W1 - 2003-12-29 - 2004-01-04',
        id: '2004W1'
      });
    });
    it('should return the correct last week for 2015', function () {
      var weeksFor2015 = (0, _weekly.generateWeeklyPeriodsForYear)(2015);
      expect(weeksFor2015[weeksFor2015.length - 1]).toEqual({
        startDate: '2015-12-28',
        endDate: '2016-01-03',
        name: 'W53 - 2015-12-28 - 2016-01-03',
        id: '2015W53'
      });
    });
    it('should return the correct last week for 2017', function () {
      var weeksFor2015 = (0, _weekly.generateWeeklyPeriodsForYear)(2017);
      expect(weeksFor2015[weeksFor2015.length - 1]).toEqual({
        startDate: '2017-12-25',
        endDate: '2017-12-31',
        name: 'W52 - 2017-12-25 - 2017-12-31',
        id: '2017W52'
      });
    });
    it('should not allow years before the year zero', function () {
      expect(function () {
        return (0, _weekly.generateWeeklyPeriodsForYear)(-10);
      }).toThrowError();
    });
    it('should throw an error when passing a Date object', function () {
      expect(function () {
        return (0, _weekly.generateWeeklyPeriodsForYear)(new Date());
      }).toThrowError();
    });
    it('should generate the same periods when called without as when called with the current year', function () {
      expect((0, _weekly.generateWeeklyPeriodsForYear)()).toEqual((0, _weekly.generateWeeklyPeriodsForYear)(new Date().getFullYear()));
    });
    it('should have 71 years in 400-year cycle with iso week 53', function () {
      var count = 0;

      for (var i = 0; i < 400; i++) {
        count += (0, _weekly.generateWeeklyPeriodsForYear)(2000 + i).length === 53 ? 1 : 0;
      }

      expect(count).toBe(71);
    });
  });
});
//# sourceMappingURL=weekly_spec.js.map