'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
 *
 * @memberof module:current-user
 */
var UserDataStoreNamespace = function (_BaseStoreNamespace) {
    _inherits(UserDataStoreNamespace, _BaseStoreNamespace);

    function UserDataStoreNamespace(namespace, keys) {
        var api = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Api2.default.getApi();
        var endPoint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'userDataStore';

        _classCallCheck(this, UserDataStoreNamespace);

        return _possibleConstructorReturn(this, (UserDataStoreNamespace.__proto__ || Object.getPrototypeOf(UserDataStoreNamespace)).call(this, namespace, keys, api, endPoint));
    }

    return UserDataStoreNamespace;
}(_BaseStoreNamespace3.default);

exports.default = UserDataStoreNamespace;
//# sourceMappingURL=UserDataStoreNamespace.js.map