"use strict";

var _Analytics = _interopRequireDefault(require("../Analytics"));

var _AnalyticsAggregate = _interopRequireDefault(require("../AnalyticsAggregate"));

var _AnalyticsEvents = _interopRequireDefault(require("../AnalyticsEvents"));

var _AnalyticsRequest = _interopRequireDefault(require("../AnalyticsRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Analytics', function () {
  var analytics;
  beforeEach(function () {
    analytics = new _Analytics.default(new _AnalyticsAggregate.default(), new _AnalyticsEvents.default(), _AnalyticsRequest.default);
  });
  it('should create an instance of Analytics', function () {
    expect(_Analytics.default.getAnalytics()).toBeInstanceOf(_Analytics.default);
  });
  it('should not be allowed to be called without new', function () {
    expect(function () {
      return (0, _Analytics.default)();
    }).toThrowErrorMatchingSnapshot();
  });
  it('should contain an instance of AnalyticsAggregate', function () {
    expect(analytics.aggregate).toBeInstanceOf(_AnalyticsAggregate.default);
  });
  it('should contain an instance of AnalyticsEvents', function () {
    expect(analytics.events).toBeInstanceOf(_AnalyticsEvents.default);
  });
  it('should contain a reference to AnalyticsRequest', function () {
    expect(analytics.request).toBe(_AnalyticsRequest.default);
  });
  describe('getAnalytics', function () {
    it('should return the same instance on consecutive requests', function () {
      expect(_Analytics.default.getAnalytics()).toBe(_Analytics.default.getAnalytics());
    });
  });
});
//# sourceMappingURL=Analytics.spec.js.map