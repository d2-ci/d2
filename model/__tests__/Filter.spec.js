"use strict";

var _Filter = _interopRequireDefault(require("../Filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Filter', function () {
  describe('getFilter', function () {
    it('should create an instance of filter', function () {
      expect(_Filter.default.getFilter()).toBeInstanceOf(_Filter.default);
    });
  });
  describe('instance', function () {
    var mockModelDefinition;
    var filter;
    var addFilterCallback;
    beforeEach(function () {
      mockModelDefinition = {};
      addFilterCallback = jest.fn().mockReturnValue(mockModelDefinition);
      filter = new _Filter.default(addFilterCallback);
    });
    it('should have a comparator', function () {
      expect(filter.comparator).toBeDefined();
    });
    it('the comparator should default to like', function () {
      expect(filter.comparator).toBe('like');
    });
    it('should set the default properyName to name', function () {
      expect(filter.propertyName).toBe('name');
    });
    describe('comparators', function () {
      it('should have an like  method', function () {
        expect(filter.like).toBeInstanceOf(Function);
      });
      it('should have an ilike method', function () {
        expect(filter.ilike).toBeInstanceOf(Function);
      });
      it('should have an equals method', function () {
        expect(filter.equals).toBeInstanceOf(Function);
      });
      it('should have a token method', function () {
        expect(filter.token).toBeInstanceOf(Function);
      });
      it('should have a nToken method', function () {
        expect(filter.nToken).toBeInstanceOf(Function);
      });
      it('should set the correct comparator', function () {
        filter.equals('ANC');
        expect(filter.comparator).toBe('eq');
      });
      it('should set the passed filterValue onto the filter', function () {
        filter.equals('ANC');
        expect(filter.filterValue).toBe('ANC');
      });
      it('should throw an error when no filterValue is provided', function () {
        expect(function () {
          return filter.equals();
        }).toThrowError('filterValue should be provided');
      });
      it('should return the modelDefinition', function () {
        expect(filter.equals('ANC')).toBe(mockModelDefinition);
      });
      it('should call the filter callback with the new filter', function () {
        filter.on('year').equals('2013');
        expect(addFilterCallback).toHaveBeenCalled();
      });
    });
    describe('on', function () {
      it('should be a function', function () {
        expect(filter.on).toBeInstanceOf(Function);
      });
      it('should return itself for chaining', function () {
        expect(filter.on('name')).toBe(filter);
      });
      it('should throw an error when the propertyName is undefined', function () {
        expect(function () {
          return filter.on();
        }).toThrowError('Property name to filter on should be provided');
      });
      it('should set the propertyName onto the filter', function () {
        filter.on('year');
        expect(filter.propertyName).toBe('year');
      });
    });
    describe('getQueryParamFormat', function () {
      beforeEach(function () {
        filter.on('code').equals('Partner_343');
      });
      it('should be a function', function () {
        expect(filter.getQueryParamFormat).toBeInstanceOf(Function);
      });
      it('should return the filter value in the expected query format', function () {
        expect(filter.getQueryParamFormat()).toBe('code:eq:Partner_343');
      });
    });
  });
});
//# sourceMappingURL=Filter.spec.js.map