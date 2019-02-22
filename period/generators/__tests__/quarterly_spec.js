"use strict";

var _quarterly = require("../quarterly");

describe('Quarterly period', function () {
  describe('generateQuarterlyPeriodsForYear()', function () {
    it('should not allow years before the year zero', function () {
      expect(function () {
        return (0, _quarterly.generateQuarterlyPeriodsForYear)(-10);
      }).toThrowError();
    });
    it('should throw an error when passing a Date object', function () {
      expect(function () {
        return (0, _quarterly.generateQuarterlyPeriodsForYear)(new Date());
      }).toThrowError();
    });
    it('should generate 4 periods for a year', function () {
      expect((0, _quarterly.generateQuarterlyPeriodsForYear)(2017)).toHaveLength(4);
    });
    it('should generate the correct quarter periods', function () {
      expect((0, _quarterly.generateQuarterlyPeriodsForYear)(2017)).toEqual([{
        startDate: '2017-01-01',
        endDate: '2017-03-31',
        name: 'January - March 2017',
        id: '2017Q1'
      }, {
        startDate: '2017-04-01',
        endDate: '2017-06-30',
        name: 'April - June 2017',
        id: '2017Q2'
      }, {
        startDate: '2017-07-01',
        endDate: '2017-09-30',
        name: 'July - September 2017',
        id: '2017Q3'
      }, {
        startDate: '2017-10-01',
        endDate: '2017-12-31',
        name: 'October - December 2017',
        id: '2017Q4'
      }]);
    });
    it('should generate the same periods when called without as when called with the current year', function () {
      expect((0, _quarterly.generateQuarterlyPeriodsForYear)()).toEqual((0, _quarterly.generateQuarterlyPeriodsForYear)(new Date().getFullYear()));
    });
  });
});
//# sourceMappingURL=quarterly_spec.js.map