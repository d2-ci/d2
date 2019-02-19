"use strict";

var _Filters = _interopRequireDefault(require("../Filters"));

var _Filter = _interopRequireDefault(require("../Filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

describe('Filters', function () {
  describe('getFilters', function () {
    it('should be a function', function () {
      expect(_Filters.default.getFilters).toBeInstanceOf(Function);
    });
    it('should return an instance of Filters', function () {
      var filters = new _Filters.default();
      expect(filters).toBeInstanceOf(_Filters.default);
    });
  });
  describe('on', function () {
    var filters;
    beforeEach(function () {
      filters = new _Filters.default();
    });
    it('should return an instance of the Filter', function () {
      expect(filters.on('code')).toBeInstanceOf(_Filter.default);
    });
    it('should have preset the filter with the passed property', function () {
      var filter = filters.on('code');
      expect(filter.propertyName).toBe('code');
    });
  });
  describe('add', function () {
    var filters;
    beforeEach(function () {
      filters = new _Filters.default();
    });
    it('should add a filter instance to the list of filters', function () {
      var filter = new _Filter.default(filters);
      filters.add(filter);
      expect(filters.filters.length).toBe(1);
      expect(filters.filters[0]).toBe(filter);
    });
    it('should not add the filter if it is not an instance of Filter', function () {
      var filter = {
        value: 'someValue',
        comparator: 'like'
      };
      expect(function () {
        return filters.add(filter);
      }).toThrowError('filter should be an instance of Filter');
    });
  });
  describe('list', function () {
    var resolvedPromise;
    var modelDefinition;
    var filters;
    beforeEach(function () {
      resolvedPromise = Promise.resolve([]);

      var ModelDefinition = function ModelDefinition() {
        _classCallCheck(this, ModelDefinition);

        this.list = jest.fn().mockReturnValue(resolvedPromise);
      };

      modelDefinition = new ModelDefinition();
      filters = new _Filters.default(modelDefinition);
    });
    it('should call the list method on the modelDefinition', function () {
      filters.list();
      expect(modelDefinition.list).toBeCalled();
    });
    it('should return the promise from the list method', function () {
      var result = filters.list();
      expect(result).toBe(resolvedPromise);
    });
  });
  describe('getQueryFilterValues', function () {
    var filters;
    beforeEach(function () {
      filters = new _Filters.default();
    });
    it('should be a function', function () {
      expect(filters.getQueryFilterValues).toBeInstanceOf(Function);
    });
    it('should return an empty array when no filters are set', function () {
      expect(filters.getQueryFilterValues()).toEqual([]);
    });
    it('should return the set filters', function () {
      filters.on('code').equals('Partner_453');
      filters.on('name').like('John');
      expect(filters.getQueryFilterValues()).toEqual(['code:eq:Partner_453', 'name:like:John']);
    });
  });
  describe('logicMode', function () {
    var filters;
    beforeEach(function () {
      filters = new _Filters.default();
    });
    it('should be a function', function () {
      expect(filters.getQueryFilterValues).toBeInstanceOf(Function);
    });
    it('should throw when invalid rootJunction are given', function () {
      expect(function () {
        return filters.logicMode('asf');
      }).toThrow();
    });
    it('should set the rootJunction on the object', function () {
      filters.logicMode('OR');
      expect(filters.rootJunction).toEqual('OR');
    });
  });
});
//# sourceMappingURL=Filters.spec.js.map