'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _defaultConfig = require('./defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

var _check = require('./lib/check');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = function () {
    function Config() {
        _classCallCheck(this, Config);
    }

    _createClass(Config, null, [{
        key: 'create',
        value: function create() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var configObjects = args.filter(function (arg) {
                return arg;
            });

            if (!configObjects.every(function (configObject) {
                return (0, _check.isType)(configObject, 'object');
            })) {
                throw new Error('Expected Config parameter to have type object');
            }

            return Object.assign.apply(Object, [{}, _defaultConfig2.default].concat(args));
        }
    }, {
        key: 'processPreInitConfig',
        value: function processPreInitConfig(preinitConfig, api) {
            if (preinitConfig.headers) {
                api.setDefaultHeaders(preinitConfig.headers);
            }

            if (preinitConfig.baseUrl) {
                api.setBaseUrl(preinitConfig.baseUrl);
            }
        }
    }, {
        key: 'processConfigForD2',
        value: function processConfigForD2(config, d2) {
            var api = d2.Api.getApi();
            d2.model.ModelDefinition.prototype.api = api; // eslint-disable-line no-param-reassign
            d2.models = d2.model.ModelDefinitions.getModelDefinitions(); // eslint-disable-line no-param-reassign

            if ((0, _check.isString)(config.baseUrl)) {
                api.setBaseUrl(config.baseUrl);
            } else {
                // default to the current version of the `/api`
                api.setBaseUrl('/api');
            }

            if (config.headers) {
                api.setDefaultHeaders(config.headers);
            }

            if (config.unauthorizedCb) {
                api.setUnauthorizedCallback(config.unauthorizedCb);
            }

            if (config.i18n && config.i18n.sources) {
                Array.from(config.i18n.sources).forEach(function (source) {
                    return d2.i18n.addSource(source);
                });
            }

            if (config.i18n && config.i18n.strings) {
                d2.i18n.addStrings(Array.from(config.i18n.strings));
            }
        }
    }]);

    return Config;
}();

exports.default = Config;
//# sourceMappingURL=config.js.map