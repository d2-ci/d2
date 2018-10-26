'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global window */


var _check = require('../lib/check');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
    function Logger(logging) {
        _classCallCheck(this, Logger);

        (0, _check.checkType)(logging, 'object', 'console');
        this.logger = logging;
    }

    _createClass(Logger, [{
        key: 'canLog',
        value: function canLog(type) {
            return !!(type && console && (0, _check.isType)(this.logger[type], 'function'));
        }
    }, {
        key: 'logMessage',
        value: function logMessage() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'log';

            if (this.canLog(type) && this.logger[type]) {
                var _logger;

                for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    rest[_key - 1] = arguments[_key];
                }

                (_logger = this.logger)[type].apply(_logger, rest);
                return true;
            }
            return false;
        }
    }, {
        key: 'debug',
        value: function debug() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            return this.logMessage.apply(this, ['debug'].concat(rest));
        }
    }, {
        key: 'error',
        value: function error() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            return this.logMessage.apply(this, ['error'].concat(rest));
        }
    }, {
        key: 'log',
        value: function log() {
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
            }

            return this.logMessage.apply(this, ['log'].concat(rest));
        }
    }, {
        key: 'warn',
        value: function warn() {
            for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                rest[_key5] = arguments[_key5];
            }

            return this.logMessage.apply(this, ['warn'].concat(rest));
        }
    }], [{
        key: 'getLogger',
        value: function getLogger() {
            var logger = void 0;

            // TODO: This is not very clean try to figure out a better way to do this.
            try {
                // Node version
                logger = global.console;
            } catch (e) {
                // Browser version fallback
                /* istanbul ignore next */
                logger = window.console;
            }

            if (this.logger) {
                return this.logger;
            }
            return this.logger = new Logger(logger);
        }
    }]);

    return Logger;
}();

exports.default = Logger;
//# sourceMappingURL=Logger.js.map