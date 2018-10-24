'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Api = require('../api/Api');

var _Api2 = _interopRequireDefault(_Api);

var _BaseStoreNamespace2 = require('./BaseStoreNamespace');

var _BaseStoreNamespace3 = _interopRequireDefault(_BaseStoreNamespace2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @augments module:datastore.BaseStoreNamespace
 * @description
 * Represents a namespace in the dataStore that can be used to be used to interact with
 * the remote API.
 *
 * @property {array} keys an array of the loaded keys.
 * @property {string} namespace Name of the namespace as on the server.
 * @memberof module:datastore
 */
var DataStoreNamespace = function (_BaseStoreNamespace) {
    _inherits(DataStoreNamespace, _BaseStoreNamespace);

    function DataStoreNamespace(namespace, keys) {
        var api = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Api2.default.getApi();
        var endPoint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'dataStore';

        _classCallCheck(this, DataStoreNamespace);

        return _possibleConstructorReturn(this, (DataStoreNamespace.__proto__ || Object.getPrototypeOf(DataStoreNamespace)).call(this, namespace, keys, api, endPoint));
    }

    /**
     * Retrieves metaData of given key in current namespace.
     *
     * @param key - the key to retrieve metaData for.
     */


    _createClass(DataStoreNamespace, [{
        key: 'getMetaData',
        value: function getMetaData(key) {
            return this.api.get([this.endPoint, this.namespace, key, 'metaData'].join('/'));
        }
    }]);

    return DataStoreNamespace;
}(_BaseStoreNamespace3.default);

exports.default = DataStoreNamespace;
//# sourceMappingURL=DataStoreNamespace.js.map