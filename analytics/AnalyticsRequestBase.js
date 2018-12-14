'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sortBy = require('lodash/sortBy');

var _sortBy2 = _interopRequireDefault(_sortBy);

var _utils = require('../lib/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @private
 * @description
 * Class for constructing a request object to use for communicating with the analytics API endpoint.
 *
 * @param {!Object} options Object with analytics request options
 *
 * @requires module:lib/utils
 *
 * @memberof module:analytics
 * @abstract
 */
var AnalyticsRequestBase = function () {
    function AnalyticsRequestBase() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$endPoint = _ref.endPoint,
            endPoint = _ref$endPoint === undefined ? 'analytics' : _ref$endPoint,
            _ref$format = _ref.format,
            format = _ref$format === undefined ? 'json' : _ref$format,
            path = _ref.path,
            program = _ref.program,
            _ref$dimensions = _ref.dimensions,
            dimensions = _ref$dimensions === undefined ? [] : _ref$dimensions,
            _ref$filters = _ref.filters,
            filters = _ref$filters === undefined ? [] : _ref$filters,
            _ref$parameters = _ref.parameters,
            parameters = _ref$parameters === undefined ? {} : _ref$parameters;

        _classCallCheck(this, AnalyticsRequestBase);

        this.endPoint = endPoint;
        this.format = format.toLowerCase();
        this.path = path;
        this.program = program;

        this.dimensions = dimensions;
        this.filters = filters;
        this.parameters = _extends({}, parameters);
    }

    /**
     * @private
     * @description
     * Builds the URL to pass to the Api object.
     * The URL includes the dimension(s) parameters.
     * Used internally.
     *
     * @param {Object} options Optional configurations
     *
     * @returns {String} URL URL for the request with dimensions included
     */


    _createClass(AnalyticsRequestBase, [{
        key: 'buildUrl',
        value: function buildUrl(options) {
            // at least 1 dimension is required
            var dimensions = this.dimensions;

            if (options && options.sorted) {
                dimensions = (0, _sortBy2.default)(dimensions, 'dimension');
            }

            var encodedDimensions = dimensions.map(function (_ref2) {
                var dimension = _ref2.dimension,
                    items = _ref2.items;

                if (Array.isArray(items) && items.length) {
                    var encodedItems = items.map(_utils.customEncodeURIComponent);
                    if (options && options.sorted) {
                        encodedItems.sort();
                    }

                    return dimension + ':' + encodedItems.join(';');
                }

                return dimension;
            });

            var endPoint = [this.endPoint, this.path, this.program].filter(function (e) {
                return !!e;
            }).join('/');

            return endPoint + '.' + this.format + '?dimension=' + encodedDimensions.join('&dimension=');
        }

        /**
         * @private
         * @description
         * Builds the query object passed to the API instance.
         * The object includes all the parameters added via with*() methods
         * and the filters added via addDataFilter(), addPeriodFilter(), addOrgUnitFilter(), addFilter().
         * The filters are handled by the API instance when building the final URL.
         * Used internally.
         *
         * @param {Object} options Optional configurations
         *
         * @returns {Object} Query parameters
         */

    }, {
        key: 'buildQuery',
        value: function buildQuery(options) {
            var filters = this.filters;

            if (options && options.sorted) {
                filters = (0, _sortBy2.default)(filters, 'dimension');
            }

            var encodedFilters = filters.map(function (_ref3) {
                var dimension = _ref3.dimension,
                    items = _ref3.items;

                if (Array.isArray(items) && items.length) {
                    var encodedItems = items.map(_utils.customEncodeURIComponent);
                    if (options && options.sorted) {
                        encodedItems.sort();
                    }

                    return dimension + ':' + encodedItems.join(';');
                }

                return dimension;
            });

            if (filters.length) {
                this.parameters.filter = encodedFilters;
            }

            return this.parameters;
        }
    }]);

    return AnalyticsRequestBase;
}();

exports.default = AnalyticsRequestBase;
//# sourceMappingURL=AnalyticsRequestBase.js.map