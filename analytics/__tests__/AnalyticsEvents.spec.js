"use strict";

var _fixtures = _interopRequireDefault(require("../../__fixtures__/fixtures"));

var _Api = _interopRequireDefault(require("../../api/Api"));

var _AnalyticsEvents = _interopRequireDefault(require("../AnalyticsEvents"));

var _AnalyticsRequest = _interopRequireDefault(require("../AnalyticsRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('../../api/Api'); // src/api/__mocks/Api.js

describe('analytics.events', function () {
  var events;
  var request;
  var mockApi;
  var fixture;
  beforeEach(function () {
    mockApi = _Api.default.getApi();

    _Api.default.mockClear();

    events = new _AnalyticsEvents.default();
  });
  it('should not be allowed to be called without new', function () {
    expect(function () {
      return (0, _AnalyticsEvents.default)();
    }).toThrowErrorMatchingSnapshot();
  });
  it('should add the mockApi onto the Analyticsevents instance', function () {
    expect(events.api).toBe(mockApi);
  });
  it('should use the api object when it is passed', function () {
    var apiMockObject = {};
    events = new _AnalyticsEvents.default(apiMockObject);
    expect(events.api).toBe(apiMockObject);
  });
  describe('.getAggregate()', function () {
    beforeEach(function () {
      events = new _AnalyticsEvents.default(new _Api.default());
      request = new _AnalyticsRequest.default().withLimit(10);
      fixture = _fixtures.default.get('/api/analytics/aggregate');
      mockApi.get.mockReturnValue(Promise.resolve(fixture));
    });
    it('should be a function', function () {
      expect(events.getAggregate).toBeInstanceOf(Function);
    });
    it('should resolve a promise with data', function () {
      return events.getAggregate(request).then(function (data) {
        expect(data).toEqual(fixture);
      });
    });
  });
  describe('.getCount()', function () {
    beforeEach(function () {
      events = new _AnalyticsEvents.default(new _Api.default());
      request = new _AnalyticsRequest.default().withProgram('eBAyeGv0exc').addPeriodDimension('LAST_YEAR').addOrgUnitDimension('ImspTQPwCqd').addDimension('qrur9Dvnyt5:LT:50');
      fixture = _fixtures.default.get('/api/analytics/count');
      mockApi.get.mockReturnValue(Promise.resolve(fixture));
    });
    it('should be a function', function () {
      expect(events.getCount).toBeInstanceOf(Function);
    });
    it('should resolve a promise with data', function () {
      return events.getCount(request).then(function (data) {
        expect(data.count).toEqual(fixture.count);
        expect(data.extent).toEqual(fixture.extent);
      });
    });
  });
  describe('.getCluster()', function () {
    beforeEach(function () {
      events = new _AnalyticsEvents.default(new _Api.default());
      request = new _AnalyticsRequest.default().withProgram('VBqh0ynB2wv').addOrgUnitDimension('ImspTQPwCqd').withStage('pTo4uMt3xur').withStartDate('2016-10-17').withEndDate('2017-10-17').withCoordinatesOnly(true).withBbox('-14.062500000000002,5.61598581915534,-11.25,8.407168163601076').withClusterSize(67265).withIncludeClusterPoints(false);
      fixture = _fixtures.default.get('/api/analytics/cluster');
      mockApi.get.mockReturnValue(Promise.resolve(fixture));
    });
    it('should be a function', function () {
      expect(events.getCluster).toBeInstanceOf(Function);
    });
    it('should resolve a promise with data', function () {
      return events.getCluster(request).then(function (data) {
        expect(data.width).toEqual(fixture.width);
        expect(data.height).toEqual(fixture.height);
      });
    });
  });
  describe('.getQuery()', function () {
    beforeEach(function () {
      events = new _AnalyticsEvents.default(new _Api.default());
      request = new _AnalyticsRequest.default().addOrgUnitDimension('ImspTQPwCqd').addDimension('qrur9Dvnyt5:LT:50').addPeriodFilter('LAST_MONTH').withStage('Zj7UnCAulEk').withPage(1).withPageSize(5);
      fixture = _fixtures.default.get('/api/analytics/query');
      mockApi.get.mockReturnValue(Promise.resolve(fixture));
    });
    it('should be a function', function () {
      expect(events.getQuery).toBeInstanceOf(Function);
    });
    it('should resolve a promise with data', function () {
      return events.getQuery(request).then(function (data) {
        expect(data.width).toEqual(fixture.width);
        expect(data.height).toEqual(fixture.height);
      });
    });
  });
});
//# sourceMappingURL=AnalyticsEvents.spec.js.map