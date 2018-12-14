'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module analytics
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _AnalyticsAggregate = require('./AnalyticsAggregate');

var _AnalyticsAggregate2 = _interopRequireDefault(_AnalyticsAggregate);

var _AnalyticsEvents = require('./AnalyticsEvents');

var _AnalyticsEvents2 = _interopRequireDefault(_AnalyticsEvents);

var _AnalyticsRequest = require('./AnalyticsRequest');

var _AnalyticsRequest2 = _interopRequireDefault(_AnalyticsRequest);

var _AnalyticsResponse = require('./AnalyticsResponse');

var _AnalyticsResponse2 = _interopRequireDefault(_AnalyticsResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @description
 * Analytics class used to request analytics data from Web API.
 *
 * @requires analytics.AnalyticsAggregate
 * @requires analytics.AnalyticsEvents
 * @requires analytics.AnalyticsRequest
 * @requires analytics.AnalyticsResponse
 *
 * @example
 * const d2Analytics = new Analytics(
 *  new AnalyticsAggregate(),
 *  new AnalyticsEvents(),
 *  AnalyticsRequest,
 *  AnalyticsResponse
 * )
 *
 * @memberof module:analytics
 * @see {@link https://docs.dhis2.org/master/en/developer/html/webapi_analytics.html} Analytics API documentation
 * @see {@link https://docs.dhis2.org/master/en/developer/html/webapi_event_analytics.html} Event analytics API documentation
 */
var Analytics = function () {
    /**
     * @param {!module:analytics.AnalyticsAggregate} analyticsAggregate The AnalyticsAggregate instance
     * @param {!module:analytics.AnalyticsEvents} analyticsEvents The AnalyticsEvents instance
     * @param {!module:analytics.AnalyticsRequest} analyticsRequest The AnalyticsRequest class
     * @param {!module:analytics.AnalyticsResponse} analyticsResponse The AnalyticsResponse class
     */
    function Analytics(analyticsAggregate, analyticsEvents, analyticsRequest, analyticsResponse) {
        _classCallCheck(this, Analytics);

        this.aggregate = analyticsAggregate;
        this.events = analyticsEvents;
        this.request = analyticsRequest;
        this.response = analyticsResponse;
    }

    /**
     * @static
     *
     * @description
     * Get a new instance of the Analytics object. This will function as a singleton, once Analytics object
     * has been created when requesting getAnalytics again the original version will be returned.
     *
     * @returns {Analytics} Object with the analytics interaction properties
     *
     * @example
     * const d2Analytics = d2.getAnalytics();
     */


    _createClass(Analytics, null, [{
        key: 'getAnalytics',
        value: function getAnalytics() {
            if (!Analytics.getAnalytics.analytics) {
                Analytics.getAnalytics.analytics = new Analytics(new _AnalyticsAggregate2.default(), new _AnalyticsEvents2.default(), _AnalyticsRequest2.default, _AnalyticsResponse2.default);
            }

            return Analytics.getAnalytics.analytics;
        }
    }]);

    return Analytics;
}();

exports.default = Analytics;
//# sourceMappingURL=Analytics.js.map