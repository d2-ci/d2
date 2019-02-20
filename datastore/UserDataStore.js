'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseStore2 = require('./BaseStore');

var _BaseStore3 = _interopRequireDefault(_BaseStore2);

var _UserDataStoreNamespace = require('./UserDataStoreNamespace');

var _UserDataStoreNamespace2 = _interopRequireDefault(_UserDataStoreNamespace);

var _Api = require('../api/Api');

var _Api2 = _interopRequireDefault(_Api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @augments module:datastore.BaseStore
 * @description
 * Represents the UserDataStore that can be interacted with. This can be used to get instances of UserDataStoreNamespace, which
 * can be used to interact with the {@link module:current-user.UserDataStoreNamespace namespace API}.
 *
 * The store is a key-value store, where a namespace contains a list of keys, and
 * a key corresponds to an arbitrary JSON-object. The store is per-user, and only the currently logged-in user
 * has access to the namespaces.
 *
 * Note that a namespace cannot exist without at least one key-value pair, for this reason
 * you need to call {@link module:current-user.UserDataStoreNamespace#set set()} after {@link module:current-user.UserDataStore#create create()} to save a namespace
 * with a key and a value.
 *
 * @example <caption>Getting a value with promise-syntax</caption>
 * import { init } from 'd2';
 *
 * init({baseUrl: 'https://play.dhis2.org/demo/api'})
 *   .then((d2) => {
 *     d2.currentUser.dataStore.get('namespace').then(namespace => {
 *          namespace.get('key').then(value => console.log(value))
 *      });
 *   });
 *
 * @example <caption>Creation of namespace with async-syntax</caption>
 * const namespace = await d2.currentUser.dataStore.create('new namespace', false);
 * // The namespace is not actually created on the server before 'set' is called
 * await namespace.set('new key', value);
 *
 * @memberof module:current-user
 */
var UserDataStore = function (_BaseStore) {
    _inherits(UserDataStore, _BaseStore);

    function UserDataStore() {
        var api = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Api2.default.getApi();
        var endPoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'userDataStore';

        _classCallCheck(this, UserDataStore);

        return _possibleConstructorReturn(this, (UserDataStore.__proto__ || Object.getPrototypeOf(UserDataStore)).call(this, api, endPoint, _UserDataStoreNamespace2.default));
    }

    /**
     * @description
     * Tries to get the given namespace from the server, and returns an instance of 'UserDataStore' that
     * may be used to interact with this namespace. See {@link module:current-user.UserDataStoreNamespace UserDataStoreNamespace}.
     *
     * @example <caption>Getting a namespace</caption>
     * d2.currentUser.dataStore.get('namespace').then(namespace => {
     *     namespace.set('new key', value);
     *});
     *
     * @param {string} namespace - Namespace to get.
     * @param {boolean} [autoLoad=true] - If true, autoloads the keys of the namespace from the server.
     * If false, an instance of the namespace is returned without any keys (no request is sent to the server).
     *
     * @returns {Promise<UserDataStoreNamespace>} An instance of a UserDataStoreNamespace representing the namespace that can be interacted with.
     */


    _createClass(UserDataStore, [{
        key: 'get',
        value: function get(namespace) {
            var autoLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            return _get(UserDataStore.prototype.__proto__ || Object.getPrototypeOf(UserDataStore.prototype), 'get', this).call(this, namespace, autoLoad);
        }

        /**
         * Creates a namespace. Ensures that the namespace does not exists on the server.
         * Note that for the namespace to be saved on the server, you need to call {@link module:current-user.UserDataStoreNamespace#set set}.
         *
         * @example <caption>Creating a namespace</caption>
         * d2.currentUser.dataStore.create('new namespace').then(namespace => {
         *     namespace.set('new key', value);
         * });
         * @param {string} namespace The namespace to create.
         * @returns {Promise<UserDataStoreNamespace>} An instance of the current store-Namespace-instance representing the namespace that can be interacted with, or
         * an error if namespace exists.
         */

    }, {
        key: 'create',
        value: function create(namespace) {
            return _get(UserDataStore.prototype.__proto__ || Object.getPrototypeOf(UserDataStore.prototype), 'create', this).call(this, namespace);
        }

        /**
         * @static
         *
         * @returns {UserDataStore} Object with the userDataStore interaction properties
         *
         * @description
         * Get a new instance of the userDataStore object. This will function as a singleton - when a UserDataStore object has been created
         * when requesting getUserDataStore again, the original version will be returned.
         */

    }], [{
        key: 'getUserDataStore',
        value: function getUserDataStore() {
            if (!UserDataStore.getUserDataStore.dataStore) {
                UserDataStore.getUserDataStore.dataStore = new UserDataStore(_Api2.default.getApi(), 'userDataStore');
            }

            return UserDataStore.getUserDataStore.dataStore;
        }
    }]);

    return UserDataStore;
}(_BaseStore3.default);

exports.default = UserDataStore;
//# sourceMappingURL=UserDataStore.js.map