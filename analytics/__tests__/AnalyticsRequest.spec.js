"use strict";

var _fixtures = _interopRequireDefault(require("../../__fixtures__/fixtures"));

var _AnalyticsRequest = _interopRequireDefault(require("../AnalyticsRequest"));

var _ModelDefinition = _interopRequireDefault(require("../../model/ModelDefinition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var request;
var expectedParameters;

var getFuncName = function getFuncName(parameter) {
  return "with".concat(parameter.charAt(0).toUpperCase()).concat(parameter.slice(1));
};

describe('AnalyticsRequest', function () {
  beforeEach(function () {
    request = new _AnalyticsRequest.default();
    expectedParameters = {};
  });
  describe('constructor', function () {
    it('should not be allowed to be called without new', function () {
      expect(function () {
        return (0, _AnalyticsRequest.default)();
      }).toThrowErrorMatchingSnapshot();
    });
    it('should initialize properties', function () {
      expect(request.parameters).toEqual({});
      expect(request.dimensions).toEqual([]);
      expect(request.filters).toEqual([]);
    });
    it('should have a default endpoint value', function () {
      expect(request.endPoint).toEqual('analytics');
    });
    it('should set the endpoint when passed as argument', function () {
      request = new _AnalyticsRequest.default({
        endPoint: 'analytics2'
      });
      expect(request.endPoint).toEqual('analytics2');
    });
  });
  describe('properties', function () {
    describe('.addDataDimension()', function () {
      it('should add the dx dimension', function () {
        request.addDataDimension('Jtf34kNZhzP');
        expect(request.dimensions).toEqual([{
          dimension: 'dx',
          items: ['Jtf34kNZhzP']
        }]);
      });
      it('should append unique values to the dx dimension on subsequent calls', function () {
        request = request.addDataDimension('Jtf34kNZhzP').addDataDimension(['Jtf34kNZhzP', 'SA7WeFZnUci', 'V37YqbqpEhV', 'bqK6eSIwo3h', 'cYeuwXTCPkU', 'fbfJHSPpUQD']);
        expect(request.dimensions).toEqual([{
          dimension: 'dx',
          items: ['Jtf34kNZhzP', 'SA7WeFZnUci', 'V37YqbqpEhV', 'bqK6eSIwo3h', 'cYeuwXTCPkU', 'fbfJHSPpUQD']
        }]);
      });
    });
    describe('.fromModel()', function () {
      var chartModelDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/chart'), _fixtures.default.get('/api/attributes').attributes);

      var model = chartModelDefinition.create(_fixtures.default.get('/chartAllFields'));
      it('should add dimensions from the model', function () {
        request = request.fromModel(model);
        expect(request.dimensions).toEqual([{
          dimension: 'dx',
          items: ['Uvn6LCg7dVU', 'sB79w2hiLp8']
        }, {
          dimension: 'ou',
          items: ['USER_ORGUNIT', 'USER_ORGUNIT_CHILDREN']
        }]);
      });
      it('should add filters from the model', function () {
        request = request.fromModel(model);
        expect(request.filters).toEqual([{
          dimension: 'pe',
          items: ['LAST_SIX_MONTH']
        }]);
      });
      it('should convert filters into dimensions when passing the optional flag', function () {
        request = request.fromModel(model, true);
        expect(request.dimensions).toEqual([{
          dimension: 'dx',
          items: ['Uvn6LCg7dVU', 'sB79w2hiLp8']
        }, {
          dimension: 'ou',
          items: ['USER_ORGUNIT', 'USER_ORGUNIT_CHILDREN']
        }, {
          dimension: 'pe',
          items: ['LAST_SIX_MONTH']
        }]);
      });
    });
    describe('.addOrgUnitDimension()', function () {
      it('should add the ou dimension', function () {
        request.addOrgUnitDimension(['ImspTQPwCqd']);
        expect(request.dimensions).toEqual([{
          dimension: 'ou',
          items: ['ImspTQPwCqd']
        }]);
      });
      it('should append unique values to the ou dimension on subsequent calls', function () {
        request = request.addOrgUnitDimension(['ImspTQPwCqd']).addOrgUnitDimension(['ImspTQPwCqd', 'O6uvpzGd5pu']);
        expect(request.dimensions).toEqual([{
          dimension: 'ou',
          items: ['ImspTQPwCqd', 'O6uvpzGd5pu']
        }]);
      });
    });
    describe('.addPeriodDimension()', function () {
      it('should add the pe dimension', function () {
        request.addPeriodDimension('2017-01');
        expect(request.dimensions).toEqual([{
          dimension: 'pe',
          items: ['2017-01']
        }]);
      });
      it('should append unique values to the pe dimension on subsequent calls', function () {
        request = request.addPeriodDimension('2017-01').addPeriodDimension(['2017-01', '2017-02', '2017-03']);
        expect(request.dimensions).toEqual([{
          dimension: 'pe',
          items: ['2017-01', '2017-02', '2017-03']
        }]);
      });
    });
    describe('.addDimension()', function () {
      it('should add the given dimension without any associated value', function () {
        request.addDimension('Jtf34kNZhzP');
        expect(request.dimensions).toEqual([{
          dimension: 'Jtf34kNZhzP',
          items: []
        }]);
      });
      it('should add the given dimension with the associated value (passed as string)', function () {
        request.addDimension('J5jldMd8OHv', 'CXw2yu5fodb');
        expect(request.dimensions).toEqual([{
          dimension: 'J5jldMd8OHv',
          items: ['CXw2yu5fodb']
        }]);
      });
      it('should append values (passed as array) to the given dimension', function () {
        request = request.addDimension('J5jldMd8OHv', 'CXw2yu5fodb').addDimension('J5jldMd8OHv', ['EYbopBOJWsW', 'test']);
        expect(request.dimensions).toEqual([{
          dimension: 'J5jldMd8OHv',
          items: ['CXw2yu5fodb', 'EYbopBOJWsW', 'test']
        }]);
      });
      it('should not append a value already present in the dimension', function () {
        request = request.addDimension('J5jldMd8OHv', ['EYbopBOJWsW', 'test']).addDimension('J5jldMd8OHv', 'test');
        expect(request.dimensions).toEqual([{
          dimension: 'J5jldMd8OHv',
          items: ['EYbopBOJWsW', 'test']
        }]);
      });
    });
    describe('.addDataFilter()', function () {
      it('should add the dx dimension filter', function () {
        request = request.addDataFilter('Jtf34kNZhzP');
        expect(request.filters).toEqual([{
          dimension: 'dx',
          items: ['Jtf34kNZhzP']
        }]);
      });
    });
    describe('.addOrgUnitFilter()', function () {
      it('should add the ou dimension filter', function () {
        request.addOrgUnitFilter(['ImspTQPwCqd']);
        expect(request.filters).toEqual([{
          dimension: 'ou',
          items: ['ImspTQPwCqd']
        }]);
      });
      it('should append unique values to the ou dimension filter on subsequent calls', function () {
        request = request.addOrgUnitFilter('ImspTQPwCqd').addOrgUnitFilter(['ImspTQPwCqd', 'O6uvpzGd5pu']);
        expect(request.filters).toEqual([{
          dimension: 'ou',
          items: ['ImspTQPwCqd', 'O6uvpzGd5pu']
        }]);
      });
    });
    describe('.addPeriodFilter()', function () {
      it('should add the pe dimension filter', function () {
        request.addPeriodFilter('2017-01');
        expect(request.filters).toEqual([{
          dimension: 'pe',
          items: ['2017-01']
        }]);
      });
      it('should append unique values to the pe dimension filter on subsequent calls', function () {
        request = request.addPeriodFilter('2017-01').addPeriodFilter(['2017-01', '2017-02', '2017-03']);
        expect(request.filters).toEqual([{
          dimension: 'pe',
          items: ['2017-01', '2017-02', '2017-03']
        }]);
      });
    });
    describe('.addFilter()', function () {
      it('should add the given dimensions as filter without any associated value', function () {
        request.addFilter('Jtf34kNZhzP');
        expect(request.filters).toEqual([{
          dimension: 'Jtf34kNZhzP',
          items: []
        }]);
      });
      it('should add the given dimensions as filter with the associated value (passed as string)', function () {
        request.addFilter('J5jldMd8OHv', 'CXw2yu5fodb');
        expect(request.filters).toEqual([{
          dimension: 'J5jldMd8OHv',
          items: ['CXw2yu5fodb']
        }]);
      });
      it('should append values (passed as array) to the given dimension filter', function () {
        request = request.addFilter('J5jldMd8OHv', 'CXw2yu5fodb').addFilter('J5jldMd8OHv', ['EYbopBOJWsW', 'test']);
        expect(request.filters).toEqual([{
          dimension: 'J5jldMd8OHv',
          items: ['CXw2yu5fodb', 'EYbopBOJWsW', 'test']
        }]);
      });
      it('should not append a value already present in the dimension filter', function () {
        request = request.addFilter('J5jldMd8OHv', ['EYbopBOJWsW', 'test']).addFilter('J5jldMd8OHv', 'test');
        expect(request.filters).toEqual([{
          dimension: 'J5jldMd8OHv',
          items: ['EYbopBOJWsW', 'test']
        }]);
      });
    });
    describe('.withParameters()', function () {
      var params = {
        completedOnly: true,
        aggregationType: 'AVERAGE'
      };
      it('should set the given parameters in the request', function () {
        request.withParameters(params);
        expect(request.parameters).toEqual(params);
      });
      it('should override a parameter if already present', function () {
        request = request.withAggregationType('COUNT');
        expect(request.parameters).toEqual({
          aggregationType: 'COUNT'
        });
        request = request.withParameters(params);
        expect(request.parameters).toEqual(params);
      });
    });
    describe('with boolean parameter', function () {
      ['aggregateData', 'coordinatesOnly', 'collapseDataDimensions', 'hideEmptyRows', 'hideEmptyColumns', 'hierarchyMeta', 'ignoreLimit', 'includeClusterPoints', 'includeNumDen', 'showHierarchy', 'skipData', 'skipMeta', 'skipRounding', 'tableLayout', 'includeMetadataDetails'].forEach(function (parameter) {
        var funcName = getFuncName(parameter);
        it("should add the ".concat(parameter, " parameter with default value"), function () {
          request[funcName]();
          expectedParameters[parameter] = true;
          expect(request.parameters).toEqual(expectedParameters);
        });
        it("should replace the ".concat(parameter, " parameter on subsequent calls with the specified value"), function () {
          request[funcName](false);
          expectedParameters[parameter] = false;
          expect(request.parameters).toEqual(expectedParameters);
        });
      });
    });
    describe('with value parameter', function () {
      ['approvalLevel', 'asc', // XXX
      'bbox', 'clusterSize', 'columns', // XXX
      'desc', // XXX
      'endDate', 'inputIdScheme', 'measureCriteria', 'outputIdScheme', 'preAggregationMeasureCriteria', 'relativePeriodDate', 'rows', // XXX
      'stage', 'startDate', 'userOrgUnit', 'value'].forEach(function (parameter) {
        var funcName = getFuncName(parameter);
        it("should add the ".concat(parameter, " parameter with the specified value"), function () {
          request[funcName]('test');
          expectedParameters[parameter] = 'test';
          expect(request.parameters).toEqual(expectedParameters);
        });
        it("should replace the ".concat(parameter, " parameter on subsequent calls with the specified value"), function () {
          request = request[funcName]('test');
          request[funcName]('test2');
          expectedParameters[parameter] = 'test2';
          expect(request.parameters).toEqual(expectedParameters);
        });
        it("should not replace the ".concat(parameter, " parameter when called without passing a value"), function () {
          request = request[funcName]('test');
          request[funcName]();
          expectedParameters[parameter] = 'test';
          expect(request.parameters).toEqual(expectedParameters);
        });
      });
    });
    describe('with numeric value parameter', function () {
      var params = {
        page: 1,
        pageSize: 50
      };
      Object.entries(params).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        var parameter = key;
        var funcName = getFuncName(parameter);
        it("should add the ".concat(parameter, " parameter with the default value"), function () {
          request[funcName]();
          expectedParameters[parameter] = value;
          expect(request.parameters).toEqual(expectedParameters);
        });
        it("should add the ".concat(parameter, " parameter with the specified value"), function () {
          request[funcName](10);
          expectedParameters[parameter] = 10;
          expect(request.parameters).toEqual(expectedParameters);
        });
        it("should replace the ".concat(parameter, " parameter on subsequent calls with the specified value"), function () {
          request = request[funcName](10);
          request[funcName](20);
          expectedParameters[parameter] = 20;
          expect(request.parameters).toEqual(expectedParameters);
        });
      });
    });
    describe('.withCoordinateField()', function () {
      it('should set the coordinateField to the specified value', function () {
        request.withCoordinateField('abc');
        expect(request.parameters).toEqual({
          coordinateField: 'abc'
        });
      });
      it('should set the coordinateField to default value when called with no value', function () {
        request.withCoordinateField();
        expect(request.parameters).toEqual({
          coordinateField: 'EVENT'
        });
      });
    });
    describe('.withFormat()', function () {
      it('should set the format to the specified value', function () {
        request.withFormat('xml');
        expect(request.format).toEqual('xml');
      });
      it('should set the format to default value when called with no value', function () {
        request.withFormat();
        expect(request.format).toEqual('json');
      });
    });
    describe('.withPath()', function () {
      it('should set the request path to the specified value', function () {
        request.withPath('test');
        expect(request.path).toEqual('test');
      });
      it('should replace the path on subsequent requests', function () {
        request = request.withPath('test').withPath('another/path');
        expect(request.path).toEqual('another/path');
      });
      it('should not replace the path when called with no value', function () {
        request = request.withPath('some/path').withPath();
        expect(request.path).toEqual('some/path');
      });
    });
    describe('.withProgram()', function () {
      it('should set the program to the specified value', function () {
        request.withProgram('eBAyeGv0exc');
        expect(request.program).toEqual('eBAyeGv0exc');
      });
      it('should not replace the program when called with no value', function () {
        request = request.withProgram('eBAyeGv0exc').withProgram();
        expect(request.program).toEqual('eBAyeGv0exc');
      });
    });
    describe('.withAggregationType()', function () {
      it('should add the aggregationType parameter with the specified value', function () {
        request.withAggregationType('SUM');
        expect(request.parameters).toEqual({
          aggregationType: 'SUM'
        });
      });
      it('should add the aggregationType parameter and uppercase the value', function () {
        request.withAggregationType('stddev');
        expect(request.parameters).toEqual({
          aggregationType: 'STDDEV'
        });
      });
      it('should allow a aggregationType that is not in present in the list', function () {
        request.withAggregationType('new-constant');
        expect(request.parameters).toEqual({
          aggregationType: 'new-constant'
        });
      });
    });
    describe('.withDisplayProperty()', function () {
      it('should add the displayProperty parameter with the specified value', function () {
        request.withDisplayProperty('NAME');
        expect(request.parameters).toEqual({
          displayProperty: 'NAME'
        });
      });
      it('should add the displayProperty parameter and uppercase the value', function () {
        request.withDisplayProperty('shortname');
        expect(request.parameters).toEqual({
          displayProperty: 'SHORTNAME'
        });
      });
      it('should allow a displayProperty that is not present in the list', function () {
        request.withDisplayProperty('new-constant');
        expect(request.parameters).toEqual({
          displayProperty: 'new-constant'
        });
      });
    });
    describe('.withOuMode()', function () {
      it('should add the ouMode parameter with the specified value', function () {
        request.withOuMode('DESCENDANTS');
        expect(request.parameters).toEqual({
          ouMode: 'DESCENDANTS'
        });
      });
      it('should add the ouMode parameter and uppercase the value', function () {
        request.withOuMode('children');
        expect(request.parameters).toEqual({
          ouMode: 'CHILDREN'
        });
      });
      it('should allow a ouMode that is not present in the list', function () {
        request.withOuMode('new-constant');
        expect(request.parameters).toEqual({
          ouMode: 'new-constant'
        });
      });
    });
    describe('.withOutputType()', function () {
      it('should add the outputType parameter with the specified value', function () {
        request.withOutputType('EVENT');
        expect(request.parameters).toEqual({
          outputType: 'EVENT'
        });
      });
      it('should add the outputType parameter and uppercase the value', function () {
        request.withOutputType('enrollment');
        expect(request.parameters).toEqual({
          outputType: 'ENROLLMENT'
        });
      });
      it('should allow a outputType that is not present in the list', function () {
        request.withOutputType('new-constant');
        expect(request.parameters).toEqual({
          outputType: 'new-constant'
        });
      });
    });
    describe('.withEventStatus()', function () {
      it('should add the eventStatus parameter with the specified value', function () {
        request.withEventStatus('ACTIVE');
        expect(request.parameters).toEqual({
          eventStatus: 'ACTIVE'
        });
      });
      it('should add the eventStatus parameter and uppercase the value', function () {
        request.withEventStatus('skipped');
        expect(request.parameters).toEqual({
          eventStatus: 'SKIPPED'
        });
      });
      it('should allow a eventStatus that is not present in the list', function () {
        request.withEventStatus('new-constant');
        expect(request.parameters).toEqual({
          eventStatus: 'new-constant'
        });
      });
    });
    describe('.withLimit()', function () {
      it('should add the limit parameter with the specified value', function () {
        request.withLimit(1000);
        expect(request.parameters).toEqual({
          limit: 1000
        });
      });
      it('should not allow a limit greater than 10000', function () {
        request.withLimit('20000');
        expect(request.parameters).toEqual({
          limit: 10000
        });
      });
      it('should not replace the value when called with no value', function () {
        request = request.withLimit('20000').withLimit();
        expect(request.parameters).toEqual({
          limit: 10000
        });
      });
    });
    describe('.withProgramStatus()', function () {
      it('should add the programStatus parameter with the specified value', function () {
        request.withProgramStatus('ACTIVE');
        expect(request.parameters).toEqual({
          programStatus: 'ACTIVE'
        });
      });
      it('should add the programStatus parameter and uppercase the value', function () {
        request.withProgramStatus('completed');
        expect(request.parameters).toEqual({
          programStatus: 'COMPLETED'
        });
      });
      it('should allow a programStatus that is not present in the list', function () {
        request.withProgramStatus('new-constant');
        expect(request.parameters).toEqual({
          programStatus: 'new-constant'
        });
      });
    });
    describe('.withSortOrder()', function () {
      it('should add the sortOrder parameter with the specified value', function () {
        request.withSortOrder('ASC');
        expect(request.parameters).toEqual({
          sortOrder: 'ASC'
        });
      });
      it('should add the sortOrder parameter and uppercase the value', function () {
        request.withSortOrder('desc');
        expect(request.parameters).toEqual({
          sortOrder: 'DESC'
        });
      });
      it('should allow a sortOrder that is not present in the list', function () {
        request.withSortOrder('new-constant');
        expect(request.parameters).toEqual({
          sortOrder: 'new-constant'
        });
      });
    });
  });
  describe('.buildUrl()', function () {
    it('should append the path to the endpoint', function () {
      request = request.addOrgUnitDimension(['ImspTQPwCqd']).withPath('test');
      expect(request.buildUrl()).toEqual('analytics/test.json?dimension=ou:ImspTQPwCqd');
    });
    it('shold build the URL with path, program and format', function () {
      request = request.withPath('events/aggregate').withProgram('program-id').withFormat('xml').addOrgUnitDimension(['ImspTQPwCqd']).addPeriodDimension('201711').addDataDimension('test-dx-dim');
      var expectedSearchParams = {
        'ou:ImspTQPwCqd': 'dimension',
        'pe:201711': 'dimension',
        'dx:test-dx-dim': 'dimension'
      };
      var url = new URL("http://localhost/".concat(request.buildUrl()));
      var searchParams = {};
      var key;
      var value;
      url.search.slice(1).split('&').forEach(function (p) {
        var _p$split = p.split('=');

        var _p$split2 = _slicedToArray(_p$split, 2);

        key = _p$split2[0];
        value = _p$split2[1];
        searchParams[value] = key;
      });
      expect(url.pathname).toEqual('/analytics/events/aggregate/program-id.xml');
      expect(searchParams).toEqual(expectedSearchParams);
    });
    it('should build the URL with a dimension without items', function () {
      request = request.addDimension('test-dim');
      expect(request.buildUrl()).toEqual('analytics.json?dimension=test-dim');
    });
  });
  describe('.buildQuery()', function () {
    it('should return an empty object when there are no filters nor parameters', function () {
      expect(request.buildQuery()).toEqual({});
    });
    it('should return an object when a filter is added', function () {
      request.addOrgUnitFilter(['ImspTQPwCqd']);
      expect(request.buildQuery()).toEqual({
        filter: ['ou:ImspTQPwCqd']
      });
    });
    it('should return an object when a filter is added with multiple values', function () {
      request.addOrgUnitFilter(['ImspTQPwCqd', 'O6uvpzGd5pu']);
      expect(request.buildQuery()).toEqual({
        filter: ['ou:ImspTQPwCqd;O6uvpzGd5pu']
      });
    });
    it('should return an object when a parameter is added', function () {
      request.withHierarchyMeta();
      expect(request.buildQuery()).toEqual({
        hierarchyMeta: true
      });
    });
    it('should return an object when parameters and filters are added', function () {
      request = request.addOrgUnitFilter(['ImspTQPwCqd', 'O6uvpzGd5pu']).withHierarchyMeta(false);
      expect(request.buildQuery()).toEqual({
        hierarchyMeta: false,
        filter: ['ou:ImspTQPwCqd;O6uvpzGd5pu']
      });
    });
  });
});
//# sourceMappingURL=AnalyticsRequest.spec.js.map