'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseStore2 = require('./BaseStore');

var _BaseStore3 = _interopRequireDefault(_BaseStore2);

var _DataStoreNamespace = require('./DataStoreNamespace');

var _DataStoreNamespace2 = _interopRequireDefault(_DataStoreNamespace);

var _Api = require('../api/Api');

var _Api2 = _interopRequireDefault(_Api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @augments module:datastore.BaseStore
 * @description
 * Represents the dataStore that can be interacted with. This can be used to get instances of DataStoreNamespace, which
 * can be used to interact with the {@link module:datastore.DataStoreNamespace namespace API}.
 *
 * The store is a key-value store, where a namespace contains a list of keys, and
 * a key corresponds to an arbitrary JSON-object. The dataStore is DHIS2-instance wide.
 *
 * Note that a namespace cannot exist without at least one key-value pair, for this reason
 * you need to call {@link module:datastore.DataStoreNamespace#set set()} after {@link module:datastore.DataStore#create create()} to save a namespace
 * with a key and a value.
 *
 * @example
 * import { init } from 'd2';
 *
 * init({baseUrl: 'https://play.dhis2.org/demo/api'})
 *   .then((d2) => {
 *     d2.dataStore.get('namespace').then(namespace => {
 *          namespace.get('key').then(value => console.log(value))
 *      });
 *   });
 *
 * @memberof module:datastore
 */
var DataStore = function (_BaseStore) {
    _inherits(DataStore, _BaseStore);

    function DataStore() {
        var api = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Api2.default.getApi();
        var endPoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dataStore';

        _classCallCheck(this, DataStore);

        return _possibleConstructorReturn(this, (DataStore.__proto__ || Object.getPrototypeOf(DataStore)).call(this, api, endPoint, _DataStoreNamespace2.default));
    }

    /**
     * @description
     * Tries to get the given namespace from the server, and returns an instance of DataStore that
     * may be used to interact with this namespace. See {@link module:datastore.DataStoreNamespace DataStore}.
     *
     * @example <caption>Getting a namespace</caption>
     * d2.dataStore.get('namespace').then(namespace => {
     *     namespace.set('new key', value);
     *});
     * @param namespace - Namespace to get.
     * @param [autoLoad=true] If true, autoloads the keys of the namespace from the server.
     * If false, an instance of the namespace is returned without any keys (no request is sent to the server).
     * @returns {Promise<DataStoreNamespace>} An instance of a DataStore representing the namespace that can be interacted with,
     * or an error if namespace exists.
     */


    _createClass(DataStore, [{
        key: 'get',
        value: function get(namespace) {
            var autoLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            return _get(DataStore.prototype.__proto__ || Object.getPrototypeOf(DataStore.prototype), 'get', this).call(this, namespace, autoLoad);
        }

        /**
         * Creates a namespace. Ensures that the namespace does not exists on the server.
         * Note that for the namespace to be saved on the server, you need to call {@link module:datastore.DataStoreNamespace#set set}.
         *
         * @example <caption>Creating a namespace</caption>
         * d2.dataStore.create('new namespace').then(namespace => {
         *     namespace.set('new key', value);
         * });
         * @param {string} namespace The namespace to create.
         * @returns {Promise<DataStoreNamespace>} An instance of the current store-Namespace-instance representing the namespace that can be interacted with, or
         * an error if namespace exists.
         */

    }, {
        key: 'create',
        value: function create(namespace) {
            return _get(DataStore.prototype.__proto__ || Object.getPrototypeOf(DataStore.prototype), 'create', this).call(this, namespace);
        }

        /**
         * @static
         *
         * @returns {DataStore} Object with the dataStore interaction properties
         *
         * @description
         * Get a new instance of the dataStore object. This will function as a singleton, when a DataStore object has been created
         * when requesting getDataStore again the original version will be returned.
         */

    }], [{
        key: 'getDataStore',
        value: function getDataStore() {
            if (!DataStore.getDataStore.dataStore) {
                DataStore.getDataStore.dataStore = new DataStore();
            }

            return DataStore.getDataStore.dataStore;
        }
    }]);

    return DataStore;
}(_BaseStore3.default);

exports.default = DataStore;
//# sourceMappingURL=DataStore.js.map