'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AnalyticsRequestDimensionsMixin = require('./AnalyticsRequestDimensionsMixin');

var _AnalyticsRequestDimensionsMixin2 = _interopRequireDefault(_AnalyticsRequestDimensionsMixin);

var _AnalyticsRequestFiltersMixin = require('./AnalyticsRequestFiltersMixin');

var _AnalyticsRequestFiltersMixin2 = _interopRequireDefault(_AnalyticsRequestFiltersMixin);

var _AnalyticsRequestPropertiesMixin = require('./AnalyticsRequestPropertiesMixin');

var _AnalyticsRequestPropertiesMixin2 = _interopRequireDefault(_AnalyticsRequestPropertiesMixin);

var _AnalyticsRequestBase = require('./AnalyticsRequestBase');

var _AnalyticsRequestBase2 = _interopRequireDefault(_AnalyticsRequestBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @description
 * Class for constructing a request object to use for communicating with the analytics API endpoint.
 *
 * @param {!Object} options Object with analytics request options
 *
 * @memberof module:analytics
 *
 * @extends module:analytics.AnalyticsRequestDimensionsMixin
 * @extends module:analytics.AnalyticsRequestFiltersMixin
 * @extends module:analytics.AnalyticsRequestPropertiesMixin
 * @extends module:analytics.AnalyticsRequestBase
 */
var AnalyticsRequest = function (_AnalyticsRequestDime) {
    _inherits(AnalyticsRequest, _AnalyticsRequestDime);

    function AnalyticsRequest() {
        _classCallCheck(this, AnalyticsRequest);

        return _possibleConstructorReturn(this, (AnalyticsRequest.__proto__ || Object.getPrototypeOf(AnalyticsRequest)).apply(this, arguments));
    }

    _createClass(AnalyticsRequest, [{
        key: 'fromModel',

        /**
         * Extracts dimensions and filters from an analytic object model and add them to the request
         *
         * @param {Object} model The analytics object model from which extract the dimensions/filters
         * @param {Boolean} [passFilterAsDimension=false] Pass filters as dimension in the query string (used in dataValueSet requests)
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .fromModel(model);
         *
         * // dimension=pe:LAST_12_MONTH&dimension=dx:fbfJHSPpUQD;cYeuwXTCPkU;Jtf34kNZhzP;hfdmMSPBgLG&filter=ou:ImspTQPwCqd
         *
         * const req2 = new d2.analytics.request()
         *    .fromModel(model, true);
         *
         * // dimension=pe:LAST_12_MONTH&dimension=dx:fbfJHSPpUQD;cYeuwXTCPkU;Jtf34kNZhzP;hfdmMSPBgLG&dimension=ou:ImspTQPwCqd
         */
        value: function fromModel(model) {
            var passFilterAsDimension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var request = this;

            // extract dimensions from model
            var columns = model.columns || [];
            var rows = model.rows || [];

            columns.concat(rows).forEach(function (d) {
                var dimension = d.dimension;

                if (d.filter) {
                    dimension += ':' + d.filter;
                }

                request = request.addDimension(dimension, d.items.map(function (item) {
                    return item.id;
                }));
            });

            // extract filters from model
            var filters = model.filters || [];

            filters.forEach(function (f) {
                request = passFilterAsDimension ? request.addDimension(f.dimension, f.items.map(function (item) {
                    return item.id;
                })) : request.addFilter(f.dimension, f.items.map(function (item) {
                    return item.id;
                }));
            });

            return request;
        }
    }]);

    return AnalyticsRequest;
}((0, _AnalyticsRequestDimensionsMixin2.default)((0, _AnalyticsRequestFiltersMixin2.default)((0, _AnalyticsRequestPropertiesMixin2.default)(_AnalyticsRequestBase2.default))));

exports.default = AnalyticsRequest;
//# sourceMappingURL=AnalyticsRequest.js.map