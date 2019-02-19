"use strict";

var _AnalyticsRequestBase = _interopRequireDefault(require("../AnalyticsRequestBase"));

var _utils = require("../../lib/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

jest.mock('../../lib/utils', function () {
  return {
    customEncodeURIComponent: jest.fn(function (x) {
      return "<".concat(x, ">");
    })
  };
});
var endPoint = 'foo';
var path = 'bar';
var program = 'census';
var format = 'json';
var basePath = "".concat(endPoint, "/").concat(path, "/").concat(program, ".").concat(format);
var dimensions = [{
  dimension: 'ou',
  items: ['mars', 'earth']
}, {
  dimension: 'dx',
  items: ['population']
}, {
  dimension: 'question'
}, {
  dimension: 'answer',
  items: ['42']
}];

var buildRequest = function buildRequest(overrides) {
  return new _AnalyticsRequestBase.default(_objectSpread({
    endPoint: endPoint,
    path: path,
    program: program,
    format: format,
    parameters: {
      foo: 'bar'
    }
  }, overrides));
};

describe('AnalyticsRequestBase', function () {
  beforeEach(function () {
    _utils.customEncodeURIComponent.mockClear();
  });
  it('Should build a URL of encoded dimension parameters', function () {
    var request = buildRequest({
      dimensions: dimensions
    });
    var url = request.buildUrl();
    expect(_utils.customEncodeURIComponent).toHaveBeenCalledTimes(4);
    expect(url).toBe("".concat(basePath, "?dimension=ou:<mars>;<earth>&dimension=dx:<population>&dimension=question&dimension=answer:<42>"));
  });
  it('Should build a URL with sorted dimension parameters when options.sorted=true', function () {
    var request = buildRequest({
      dimensions: dimensions
    });
    var url = request.buildUrl({
      sorted: true
    });
    expect(_utils.customEncodeURIComponent).toHaveBeenCalledTimes(4);
    expect(url).toBe("".concat(basePath, "?dimension=answer:<42>&dimension=dx:<population>&dimension=ou:<earth>;<mars>&dimension=question"));
  });
  it('Should not choke on a null or empty filter array', function () {
    var request = buildRequest();
    var query = request.buildQuery();
    expect(_utils.customEncodeURIComponent).toHaveBeenCalledTimes(0);
    expect(query).toMatchObject({
      foo: 'bar'
    });
    var request2 = buildRequest({
      filters: []
    });
    var query2 = request2.buildQuery();
    expect(_utils.customEncodeURIComponent).toHaveBeenCalledTimes(0);
    expect(query2).toMatchObject({
      foo: 'bar'
    });
  });
  it('Should build a query with encoded filter parameters', function () {
    var request = buildRequest({
      filters: dimensions
    });
    var query = request.buildQuery();
    expect(_utils.customEncodeURIComponent).toHaveBeenCalledTimes(4);
    expect(query).toMatchObject({
      foo: 'bar',
      filter: ['ou:<mars>;<earth>', 'dx:<population>', 'question', 'answer:<42>']
    });
  });
  it('Should build a query with sorted filter parameters when options.sorted=true', function () {
    var request = buildRequest({
      filters: dimensions
    });
    var query = request.buildQuery({
      sorted: true
    });
    expect(_utils.customEncodeURIComponent).toHaveBeenCalledTimes(4);
    expect(query).toMatchObject({
      foo: 'bar',
      filter: ['answer:<42>', 'dx:<population>', 'ou:<earth>;<mars>', 'question']
    });
  });
});
//# sourceMappingURL=AnalyticsRequestBase.spec.js.map