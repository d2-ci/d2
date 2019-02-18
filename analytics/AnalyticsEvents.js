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
 * Analytics events class used to request analytics events data from Web API.
 *
 * @memberof module:analytics
 *
 * @see https://docs.dhis2.org/master/en/developer/html/webapi_event_analytics.html
 */
var AnalyticsEvents = function (_AnalyticsBase) {
  _inherits(AnalyticsEvents, _AnalyticsBase);

  function AnalyticsEvents() {
    _classCallCheck(this, AnalyticsEvents);

    return _possibleConstructorReturn(this, (AnalyticsEvents.__proto__ || Object.getPrototypeOf(AnalyticsEvents)).apply(this, arguments));
  }

  _createClass(AnalyticsEvents, [{
    key: 'getAggregate',

    /**
     * @param {!AnalyticsRequest} req Request object
     *
     * @returns {Promise} Promise that resolves with the analytics aggregate data from the api.
     *
     * @example
     * const req = new d2.analytics.request()
     *  .withProgram('eBAyeGv0exc')
     *  .addDataDimension(['Uvn6LCg7dVU','OdiHJayrsKo'])
     *  .addPeriodDimension('LAST_4_QUARTERS')
     *  .addOrgUnitDimension(['lc3eMKXaEfw','PMa2VCrupOd'])
     *  .addOrgUnitFilter('O6uvpzGd5pu')
     *  .withStartDate('2017-10-01')
     *  .withEndDate('2017-10-31');
     *
     *  d2.analytics.events.getAggregate(req)
     *  .then(console.log);
     */
    value: function getAggregate(req) {
      return this.fetch(req.withPath('events/aggregate'));
    }

    /**
     * @param {!AnalyticsRequest} req Request object
     *
     * @returns {Promise} Promise that resolves with the analytics count data from the api.
     *
     * @example
     * const req = new d2.analytics.request()
     *  .withProgram('eBAyeGv0exc')
     *  .addDataDimension(['Uvn6LCg7dVU','OdiHJayrsKo'])
     *  .addPeriodDimension('LAST_4_QUARTERS')
     *  .addOrgUnitDimension(['lc3eMKXaEfw','PMa2VCrupOd'])
     *  .addOrgUnitFilter('O6uvpzGd5pu')
     *  .withStartDate('2017-10-01')
     *  .withEndDate('2017-10-31');
     *
     *  d2.analytics.events.getCount(req)
     *  .then(console.log);
     */

  }, {
    key: 'getCount',
    value: function getCount(req) {
      return this.fetch(req.withPath('events/count'));
    }

    /**
     * @param {!AnalyticsRequest} req Request object
     * Must contain clusterSize and bbox parameters.
     *
     * @returns {Promise} Promise that resolves with the analytics cluster data from the api.
     *
     * @example
     * const req = new d2.analytics.request()
     *  .withProgram('eBAyeGv0exc')
     *  .addDataDimension(['Uvn6LCg7dVU','OdiHJayrsKo'])
     *  .addPeriodDimension('LAST_4_QUARTERS')
     *  .addOrgUnitDimension(['lc3eMKXaEfw','PMa2VCrupOd'])
     *  .addOrgUnitFilter('O6uvpzGd5pu')
     *  .withStartDate('2017-10-01')
     *  .withEndDate('2017-10-31')
     *  .withClusterSize(100000)
     *  .withBbox('-13.2682125,7.3721619,-10.4261178,9.904012');
     *
     *  d2.analytics.events.getCluster(req)
     *  .then(console.log);
     */

  }, {
    key: 'getCluster',
    value: function getCluster(req) {
      return this.fetch(req.withPath('events/cluster'));
    }

    /**
     * @param {!AnalyticsRequest} req Request object
     *
     * @returns {Promise} Promise that resolves with the analytics query data from the api.
     *
     * @example
     * const req = new d2.analytics.request()
     *  .withProgram('eBAyeGv0exc')
     *  .addDataDimension(['Uvn6LCg7dVU','OdiHJayrsKo'])
     *  .addPeriodDimension('LAST_4_QUARTERS')
     *  .addOrgUnitDimension(['lc3eMKXaEfw','PMa2VCrupOd'])
     *  .addOrgUnitFilter('O6uvpzGd5pu')
     *  .withStartDate('2017-10-01')
     *  .withEndDate('2017-10-31');
     *
     *  d2.analytics.events.getQuery(req)
     *  .then(console.log);
     */

  }, {
    key: 'getQuery',
    value: function getQuery(req) {
      return this.fetch(req.withPath('events/query'));
    }
  }]);

  return AnalyticsEvents;
}(_AnalyticsBase3.default);

exports.default = AnalyticsEvents;
//# sourceMappingURL=AnalyticsEvents.js.map