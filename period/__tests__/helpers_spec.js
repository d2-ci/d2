"use strict";

var _helpers = require("../helpers");

describe('Period helpers', function () {
  describe('formatAsISODate()', function () {
    it('should format a date as YYYY-MM-DD', function () {
      expect((0, _helpers.formatAsISODate)(new Date(2017, 1, 1))).toBe('2017-02-01');
    });
    it('should throw when the passed date is not a Date', function () {
      expect(function () {
        return (0, _helpers.formatAsISODate)('2017-02-01');
      }).toThrowError();
      expect(function () {
        return (0, _helpers.formatAsISODate)();
      }).toThrowError();
      expect(function () {
        return (0, _helpers.formatAsISODate)(null);
      }).toThrowError();
      expect(function () {
        return (0, _helpers.formatAsISODate)(1);
      }).toThrowError();
    });
  });
  describe('filterFuturePeriods()', function () {
    var periods = [{
      endDate: '2015-12-31',
      startDate: '2015-01-01',
      name: '2015',
      id: '2015'
    }, {
      endDate: '2016-12-31',
      startDate: '2016-01-01',
      name: '2016',
      id: '2016'
    }, {
      endDate: '2017-12-31',
      startDate: '2017-01-01',
      name: '2017',
      id: '2017'
    }, {
      endDate: '2018-12-31',
      startDate: '2018-01-01',
      name: '2018',
      id: '2018'
    }, {
      endDate: '2018-12-31',
      startDate: '2018-01-01',
      name: '2018',
      id: '2018'
    }];
    beforeEach(function () {
      var DateGlobal = global.Date;
      var now = new Date('Mon July 11 2017 17:09:35 GMT+0200 (CEST)');
      jest.spyOn(global, 'Date') // Return our own fake `now` when no dateString was passed
      .mockImplementation(function (dateString) {
        return dateString ? new DateGlobal(dateString) : now;
      });
    });
    afterEach(function () {
      global.Date.mockRestore();
    });
    it('should filter out the future periods', function () {
      expect((0, _helpers.filterFuturePeriods)(periods)).toHaveLength(3);
    });
    it('should filter out the future periods', function () {
      expect((0, _helpers.filterFuturePeriods)(periods)).toEqual([{
        endDate: '2015-12-31',
        startDate: '2015-01-01',
        name: '2015',
        id: '2015'
      }, {
        endDate: '2016-12-31',
        startDate: '2016-01-01',
        name: '2016',
        id: '2016'
      }, {
        endDate: '2017-12-31',
        startDate: '2017-01-01',
        name: '2017',
        id: '2017'
      }]);
    });
  });
  describe('getLastDateOfMonth()', function () {
    it('returns the correct date for normal and leap years', function () {
      expect((0, _helpers.getLastDateOfMonth)(1980, 1).getDate()).toBe(29);
      expect((0, _helpers.getLastDateOfMonth)(1981, 1).getDate()).toBe(28);
      expect((0, _helpers.getLastDateOfMonth)(2000, 0).getDate()).toBe(31);
    });
  });
  describe('getFirstDateOfQuarter()', function () {
    it('returns the correct start date for each quarter', function () {
      expect((0, _helpers.getFirstDateOfQuarter)(2017, 1).toDateString()).toBe(new Date(2017, 0, 1).toDateString());
      expect((0, _helpers.getFirstDateOfQuarter)(2017, 2).toDateString()).toBe(new Date(2017, 3, 1).toDateString());
      expect((0, _helpers.getFirstDateOfQuarter)(2017, 3).toDateString()).toBe(new Date(2017, 6, 1).toDateString());
      expect((0, _helpers.getFirstDateOfQuarter)(2017, 4).toDateString()).toBe(new Date(2017, 9, 1).toDateString());
    });
  });
  describe('getLastDateOfQuarter()', function () {
    it('returns the correct end date for each quarter', function () {
      var lastOfMarch = new Date(2017, 2, 31);
      var lastOfJune = new Date(2017, 5, 30);
      var lastOfSept = new Date(2017, 8, 30);
      var lastOfDec = new Date(2017, 11, 31);
      expect((0, _helpers.getLastDateOfQuarter)(2017, 1).toDateString()).toBe(lastOfMarch.toDateString());
      expect((0, _helpers.getLastDateOfQuarter)(2017, 2).toDateString()).toBe(lastOfJune.toDateString());
      expect((0, _helpers.getLastDateOfQuarter)(2017, 3).toDateString()).toBe(lastOfSept.toDateString());
      expect((0, _helpers.getLastDateOfQuarter)(2017, 4).toDateString()).toBe(lastOfDec.toDateString());
    });
  });
});
//# sourceMappingURL=helpers_spec.js.map