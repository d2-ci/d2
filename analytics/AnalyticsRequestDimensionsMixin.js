'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AnalyticsRequest = require('./AnalyticsRequest');

var _AnalyticsRequest2 = _interopRequireDefault(_AnalyticsRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @private
 * @description
 * AnalyticsRequest dimensions mixin function
 *
 * @param {*} base The base class to mix onto
 * @return {module:analytics.AnalyticsRequestDimensionsMixin} The mixin class
 */
var AnalyticsRequestDimensionsMixin = function AnalyticsRequestDimensionsMixin(base) {
    return (
        /**
         * @private
         * @description
         * AnalyticsRequest dimensions mixin class
         *
         * @alias module:analytics.AnalyticsRequestDimensionsMixin
         */
        function (_base) {
            _inherits(_class, _base);

            function _class() {
                _classCallCheck(this, _class);

                return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
            }

            _createClass(_class, [{
                key: 'addDataDimension',

                /**
                 * Adds/updates the dx dimension to use in the request.
                 *
                 * @param {!(String|Array)} items The dimension items to add to the dx dimension
                 *
                 * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
                 *
                 * @example
                 * const req = new d2.analytics.request()
                 *    .addDataDimension(['fbfJHSPpUQD', 'cYeuwXTCPkU'])
                 *    .addDataDimension('BfMAe6Itzgt.REPORTING_RATE');
                 *
                 * // dimension=dx:fbfJHSPpUQD;cYeuwXTCPkU;BfMAe6Itzgt.REPORTING_RATE
                 *
                 */
                value: function addDataDimension(items) {
                    return this.addDimension('dx', items);
                }

                /**
                 * Adds/updates the pe dimension to use in the request.
                 *
                 * @param {!(String|Array)} items The dimension items to add to the pe dimension
                 *
                 * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
                 *
                 * @example
                 * const req = new d2.analytics.request()
                 *    .addPeriodDimension(['201701', '201702'])
                 *    .addPeriodDimension('LAST_4_QUARTERS');
                 *
                 * // dimension=pe:201701;201702;LAST_4_QUARTERS
                 */

            }, {
                key: 'addPeriodDimension',
                value: function addPeriodDimension(items) {
                    return this.addDimension('pe', items);
                }

                /**
                 * Adds/updates the ou dimension to use in the request.
                 *
                 * @param {!(String|Array)} items The dimension items to add to the ou dimension
                 *
                 * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
                 *
                 * @example
                 * const req = new d2.analytics.request()
                 *    .addOrgUnitDimension(['O6uvpzGd5pu', 'lc3eMKXaEfw'])
                 *    .addOrgUnitDimension('OU_GROUP-w0gFTTmsUcF');
                 *
                 * // dimension=ou:O6uvpzGd5pu;lc3eMKXaEfw;OU_GROUP-w0gFTTmsUcF
                 */

            }, {
                key: 'addOrgUnitDimension',
                value: function addOrgUnitDimension(items) {
                    return this.addDimension('ou', items);
                }

                /**
                 * Adds a new dimension or updates an existing one to use in the request.
                 *
                 * @param {!String} dimension The dimension to add to the request
                 * @param {(String|Array)} items The dimension items to add to the dimension
                 *
                 * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
                 *
                 * @example
                 * const req = new d2.analytics.request()
                 *    .addDimension('Bpx0589u8y0', ['oRVt7g429ZO', 'MAs88nJc9nL'])
                 *    .addDimension('qrur9Dvnyt5-Yf6UHoPkdS6');
                 *
                 * // dimension=Bpx0589u8y0:oRVt7g429ZO;MAs88nJc9nL&dimension=qrur9Dvnyt5-Yf6UHoPkdS6
                 */

            }, {
                key: 'addDimension',
                value: function addDimension(dimension, items) {
                    var dimensionIndex = 0;

                    var existingDimension = this.dimensions.find(function (item, index) {
                        if (item.dimension === dimension) {
                            dimensionIndex = index;

                            return item;
                        }

                        return false;
                    });

                    var updatedItems = [];
                    var existingItems = [];

                    if (existingDimension) {
                        existingItems = existingDimension.items || [];
                    }

                    if (typeof items === 'string') {
                        updatedItems = [].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(existingItems), [items]))));
                    } else if (Array.isArray(items)) {
                        updatedItems = [].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(existingItems), _toConsumableArray(items)))));
                    }

                    if (existingDimension) {
                        this.dimensions.splice(dimensionIndex, 1, { dimension: dimension, items: updatedItems });
                    } else {
                        this.dimensions.push({ dimension: dimension, items: updatedItems });
                    }

                    return new _AnalyticsRequest2.default(this);
                }
            }]);

            return _class;
        }(base)
    );
};

exports.default = AnalyticsRequestDimensionsMixin;
//# sourceMappingURL=AnalyticsRequestDimensionsMixin.js.map