"use strict";

var _Api = _interopRequireDefault(require("../../api/Api"));

var _AnalyticsBase = _interopRequireDefault(require("../AnalyticsBase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('../../api/Api'); // src/api/__mocks/Api.js

var base;
describe('constructor', function () {
  beforeEach(function () {
    base = new _AnalyticsBase.default(new _Api.default());
  });
  it('should not be allowed to be called without new', function () {
    expect(function () {
      return (0, _AnalyticsBase.default)();
    }).toThrowErrorMatchingSnapshot(); // eslint-disable-line new-cap
  });
  it('should add the mockApi onto the AnalyticsBase instance', function () {
    var mockApi = _Api.default.getApi();

    _Api.default.mockClear();

    expect(base.api).toBe(mockApi);
  });
  it('should use the api object when it is passed', function () {
    var apiMockObject = {};
    base = new _AnalyticsBase.default(apiMockObject);
    expect(base.api).toBe(apiMockObject);
  });
});
//# sourceMappingURL=AnalyticsBase.spec.js.map