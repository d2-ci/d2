'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AnalyticsBase2 = require('./AnalyticsBase');

var _AnalyticsBase3 = _interopRequireDefault(_AnalyticsBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends module:analytics.AnalyticsBase
 *
 * @description
 * Analytics aggregate class used to request aggregate analytics data from Web API.
 *
 * @memberof module:analytics
 *
 * @see https://docs.dhis2.org/master/en/developer/html/webapi_analytics.html
 */
var AnalyticsAggregate = function (_AnalyticsBase) {
  _inherits(AnalyticsAggregate, _AnalyticsBase);

  function AnalyticsAggregate() {
    _classCallCheck(this, AnalyticsAggregate);

    return _possibleConstructorReturn(this, (AnalyticsAggregate.__proto__ || Object.getPrototypeOf(AnalyticsAggregate)).apply(this, arguments));
  }

  _createClass(AnalyticsAggregate, [{
    key: 'getDataValueSet',

    /**
     * @param {!AnalyticsRequest} req Request object
     *
     * @returns {Promise} Promise that resolves with the analytics data value set data from the API.
     *
     * @example
     * const req = new d2.analytics.request()
     *  .addDataDimension(['Uvn6LCg7dVU','OdiHJayrsKo'])
     *  .addPeriodDimension('LAST_4_QUARTERS')
     *  .addOrgUnitDimension(['lc3eMKXaEfw','PMa2VCrupOd'])
     *  .addOrgUnitFilter('O6uvpzGd5pu')
     *  .withStartDate('2017-10-01')
     *  .withEndDate('2017-10-31');
     *
     * d2.analytics.aggregate.getDataValueSet(req)
     * .then(console.log);
     */
    value: function getDataValueSet(req) {
      return this.fetch(req.withPath('dataValueSet'));
    }

    /**
     * @param {!AnalyticsRequest} req Request object
     *
     * @returns {Promise} Promise that resolves with the raw data from the API.
     *
     * @example
     * const req = new d2.analytics.request()
     *  .addDataDimension(['Uvn6LCg7dVU','OdiHJayrsKo'])
     *  .addPeriodDimension('LAST_4_QUARTERS')
     *  .addOrgUnitDimension(['lc3eMKXaEfw', 'PMa2VCrupOd'])
     *  .addOrgUnitFilter('O6uvpzGd5pu');
     *  .withStartDate('2017-10-01')
     *  .withEndDate('2017-10-31')
     *  .withFormat('xml');
     *
     *  d2.analytics.aggregate.getRawData(req)
     *  .then(console.log);
     */

  }, {
    key: 'getRawData',
    value: function getRawData(req) {
      return this.fetch(req.withPath('rawData'));
    }

    /**
     * @param {!AnalyticsRequest} req Request object
     *
     * @returns {Promise} Promise that resolves with the SQL statement used to query the database.
     *
     * @example
     * const req = new d2.analytics.request()
     *  .addDataDimension(['Uvn6LCg7dVU','OdiHJayrsKo'])
     *  .addPeriodDimension('LAST_4_QUARTERS')
     *  .addOrgUnitDimension(['lc3eMKXaEfw', 'PMa2VCrupOd'])
     *  .addOrgUnitFilter('O6uvpzGd5pu');
     *  .withStartDate('2017-10-01')
     *  .withEndDate('2017-10-31');
     *
     *  d2.analytics.aggregate.getDebugSql(req);
     *  .then(console.log);
     */

  }, {
    key: 'getDebugSql',
    value: function getDebugSql(req) {
      return this.fetch(req.withPath('debug/sql'));
    }
  }]);

  return AnalyticsAggregate;
}(_AnalyticsBase3.default);

exports.default = AnalyticsAggregate;
//# sourceMappingURL=AnalyticsAggregate.js.map