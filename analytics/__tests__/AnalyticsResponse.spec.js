"use strict";

var _fixtures = _interopRequireDefault(require("../../__fixtures__/fixtures"));

var _AnalyticsResponse = _interopRequireDefault(require("../AnalyticsResponse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fixture = _fixtures.default.get('/api/analytics/response');

var response;
describe('AnalyticsResponse', function () {
  beforeEach(function () {
    response = new _AnalyticsResponse.default(fixture);
  });
  describe('constructor', function () {
    it('should not be allowed to be called without new', function () {
      expect(function () {
        return (0, _AnalyticsResponse.default)();
      }).toThrowErrorMatchingSnapshot();
    });
    it('should set the response when passed as argument', function () {
      expect(response.response).toEqual(fixture);
    });
  });
  describe('properties', function () {
    describe('.extractHeaders()', function () {
      it('should return the headers from the response', function () {
        var headers = response.extractHeaders();
        expect(headers).toHaveLength(4);
      });
    });
    describe('.extractRows()', function () {
      it('should return the rows from the response', function () {
        var rows = response.extractRows();
        expect(rows).toHaveLength(312);
      });
    });
    describe('.extractMetadata()', function () {
      it('should return the metadata from the response', function () {
        var metadata = response.extractMetadata();
        expect(metadata.dimensions).toEqual(fixture.metaData.dimensions);
        expect(metadata.items).toEqual(fixture.metaData.items);
      }); // TODO
      // test with OUNAME case
    });
  });
});
//# sourceMappingURL=AnalyticsResponse.spec.js.map