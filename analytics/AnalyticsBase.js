'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Api = require('../api/Api');

var _Api2 = _interopRequireDefault(_Api);

var _AnalyticsRequest = require('./AnalyticsRequest');

var _AnalyticsRequest2 = _interopRequireDefault(_AnalyticsRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @private
 * @description
 * Base class for communicating with the analytics API endpoint.
 * Its subclasses can be used to get analytics data.
 *
 * @param {Instance} [api=<Api>] Api instance to use for the requests
 *
 * @requires module:api/Api
 *
 * @memberof module:analytics
 * @abstract
 */
var AnalyticsBase = function () {
    function AnalyticsBase() {
        var api = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Api2.default.getApi();

        _classCallCheck(this, AnalyticsBase);

        this.api = api;
    }

    /**
     * Loads the analytics data and returns them as an object from the promise.
     * Two parallel requests are made against the analytics api.
     * One for getting only the metaData and one for getting the actual data.
     * This is for caching purposes, as in many situations the metaData request changes while
     * the data one will be the same and thus have the same response.
     * This methods takes care of adding the default extra parameters to both requests.
     *
     * @param {!AnalyticsRequest} req Analytics request object with the request details
     *
     * @returns {Promise} Promise that resolves with the analytics data and metaData from the api.
     *
     * @example
     * const req = new d2.analytics.request()
     *  .addDataDimension(['Uvn6LCg7dVU','OdiHJayrsKo'])
     *  .addPeriodDimension('LAST_4_QUARTERS')
     *  .addOrgUnitDimension(['lc3eMKXaEfw','PMa2VCrupOd']);
     *
     * d2.analytics.aggregate
     *  .get(req)
     *  .then(analyticsData => console.log('Analytics data', analyticsData))
     *
     * // { metaData: { ... }, rows: [ ... ], headers: [ ... ], height: 0, width: 0 }
     */


    _createClass(AnalyticsBase, [{
        key: 'get',
        value: function get(req) {
            // keep metaData and data requests separate for caching purposes
            var metaDataReq = new _AnalyticsRequest2.default(req).withSkipMeta(false).withSkipData(true).withIncludeMetadataDetails(true);

            var dataReq = new _AnalyticsRequest2.default(req).withSkipData(false).withSkipMeta(true).withIncludeNumDen().withDisplayProperty('SHORTNAME');

            // parallelize requests
            return Promise.all([this.fetch(dataReq, { sorted: true }), this.fetch(metaDataReq)]).then(function (responses) {
                return Promise.resolve(_extends({}, responses[0], { metaData: responses[1].metaData }));
            });
        }

        /**
         * @private
         * @description
         * This method does not manipulate the request object, but directly requests the data from the api
         * based on the request's configuration.
         *
         * @param {!AnalyticsRequest} req Request object
         * @param {Object} options Optional configurations, ie. for sorting dimensions
         *
         * @returns {Promise} Promise that resolves with the data from the api.
         *
         * @example
         * const req = new d2.analytics.request()
         *  .fromModel(chartModel)
         *  .withSkipData();
         *
         * d2.analytics.aggregate
         *  .fetch(req)
         *  .then(analyticsData => console.log('Analytics data', analyticsData))
         *
         * // { metaData: { ... }, rows: [], height: 0, width: 0 }
         */

    }, {
        key: 'fetch',
        value: function fetch(req, options) {
            return this.api.get(req.buildUrl(options), req.buildQuery(options)).then(function (data) {
                return Promise.resolve(data);
            });
        }
    }]);

    return AnalyticsBase;
}();

exports.default = AnalyticsBase;
//# sourceMappingURL=AnalyticsBase.js.map