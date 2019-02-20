"use strict";

var _fixtures = _interopRequireDefault(require("../../__fixtures__/fixtures"));

var _Api = _interopRequireDefault(require("../../api/Api"));

var _AnalyticsRequest = _interopRequireDefault(require("../AnalyticsRequest"));

var _AnalyticsAggregate = _interopRequireDefault(require("../AnalyticsAggregate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('../../api/Api'); // src/api/__mocks/Api.js

var debugSqlFixture = "select de.name as de_name, de.uid as de_uid, de.dataelementid as de_id, pe.startdate as\nstart_date, pe.enddate as end_date, pt.name as pt_name, ou.name as ou_name, ou.uid as ou_uid, ou.organisationunitid as\nou_id, coc.name as coc_name, coc.uid as coc_uid, coc.categoryoptioncomboid as coc_id, aoc.name as aoc_name, aoc.uid as\naoc_uid, aoc.categoryoptioncomboid as aoc_id, dv.value as datavalue from datavalue dv inner join dataelement de on\ndv.dataelementid = de.dataelementid inner join period pe on dv.periodid = pe.periodid inner join periodtype pt on\npe.periodtypeid = pt.periodtypeid inner join organisationunit ou on dv.sourceid = ou.organisationunitid inner join\ncategoryoptioncombo coc on dv.categoryoptioncomboid = coc.categoryoptioncomboid inner join categoryoptioncombo aoc on\ndv.attributeoptioncomboid = aoc.categoryoptioncomboid where dv.dataelementid in (359596,359597) and ((pe.startdate >=\n    '2016-01-01' and pe.enddate <= '2016-03-31') or (pe.startdate >= '2016-04-01' and pe.enddate <= '2016-06-30') ) and\n((dv.sourceid in (select organisationunitid from _orgunitstructure where idlevel2 = 264)) ) and dv.deleted is false\nlimit 100000";
describe('Analytics.aggregate', function () {
  var aggregate;
  var request;
  var mockApi;
  var fixture;
  beforeEach(function () {
    mockApi = _Api.default.getApi();

    _Api.default.mockClear();

    aggregate = new _AnalyticsAggregate.default();
  });
  it('should not be allowed to be called without new', function () {
    expect(function () {
      return (0, _AnalyticsAggregate.default)();
    }).toThrowErrorMatchingSnapshot();
  });
  it('should add the mockApi onto the AnalyticsAggregate instance', function () {
    expect(aggregate.api).toBe(mockApi);
  });
  it('should use the api object when it is passed', function () {
    var apiMockObject = {};
    aggregate = new _AnalyticsAggregate.default(apiMockObject);
    expect(aggregate.api).toBe(apiMockObject);
  });
  describe('.getDataValueSet()', function () {
    beforeEach(function () {
      aggregate = new _AnalyticsAggregate.default(new _Api.default());
      request = new _AnalyticsRequest.default();
      request.addDataDimension(['fbfJHSPpUQD.pq2XI5kz2BY', 'fbfJHSPpUQD.PT59n8BQbqM']).addPeriodDimension('LAST_MONTH').addOrgUnitDimension('ImspTQPwCqd');
      fixture = _fixtures.default.get('/api/analytics/dataValueSet');
      mockApi.get.mockReturnValue(Promise.resolve(fixture));
    });
    it('should be a function', function () {
      expect(aggregate.getDataValueSet).toBeInstanceOf(Function);
    });
    it('should resolve a promise with data', function () {
      return aggregate.getDataValueSet(request).then(function (data) {
        expect(data.dataValues.length).toEqual(fixture.dataValues.length);
      });
    });
  });
  describe('.getDebugSql()', function () {
    beforeEach(function () {
      aggregate = new _AnalyticsAggregate.default(new _Api.default());
      request = new _AnalyticsRequest.default();
      request.addDataDimension(['fbfJHSPpUQD', 'cYeuwXTCPkU']).addPeriodFilter(['2016Q1', '2016Q2']).addOrgUnitFilter('O6uvpzGd5pu');
      mockApi.get.mockReturnValue(Promise.resolve(debugSqlFixture));
    });
    it('should be a function', function () {
      expect(aggregate.getDebugSql).toBeInstanceOf(Function);
    });
    it('should resolve a promise with data', function () {
      return aggregate.getDebugSql(request).then(function (data) {
        expect(data).toEqual(debugSqlFixture);
      });
    });
  });
  describe('.getRawData', function () {
    beforeEach(function () {
      aggregate = new _AnalyticsAggregate.default(new _Api.default());
      request = new _AnalyticsRequest.default();
      request.addDataDimension(['fbfJHSPpUQD', 'cYeuwXTCPkU', 'Jtf34kNZhzP']).addDimension('J5jldMd8OHv').addDimension('Bpx0589u8y0').addOrgUnitDimension(['O6uvpzGd5pu', 'fdc6uOvgoji']).withStartDate('2016-01-01').withEndDate('2016-01-31');
      fixture = _fixtures.default.get('/api/analytics/rawData');
      mockApi.get.mockReturnValue(Promise.resolve(fixture));
    });
    it('should be a function', function () {
      expect(aggregate.getRawData).toBeInstanceOf(Function);
    });
    it('should resolve a promise with data', function () {
      return aggregate.getRawData(request).then(function (data) {
        expect(data.metaData.items).toEqual(fixture.metaData.items);
        expect(data.metaData.dimensions).toEqual(fixture.metaData.dimensions);
        expect(data.width).toEqual(0);
        expect(data.height).toEqual(0);
      });
    });
  });
});
//# sourceMappingURL=AnalyticsAggregate.spec.js.map