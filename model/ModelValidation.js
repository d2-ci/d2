'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _check = require('../lib/check');

var _Logger = require('../logger/Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _Api = require('../api/Api');

var _Api2 = _interopRequireDefault(_Api);

var _json = require('./helpers/json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Handles validation of Model objects based on their modelDefinition.
 *
 * @memberof module:model
 */
var ModelValidation = function () {
    function ModelValidation(providedLogger) {
        _classCallCheck(this, ModelValidation);

        (0, _check.checkType)(providedLogger, 'object', 'logger (Logger)');
        this.logger = providedLogger;
    }

    /**
     * @deprecated Client side model validation is deprecated in favour of server side validation only.
     *
     * @returns {{status: boolean, messages: Array}} Returns {status: true, messages: []}
     */


    _createClass(ModelValidation, [{
        key: 'validate',
        value: function validate() {
            this.logger.warn('Client side model validation is deprecated');
            throw new Error('Client side model validation is deprecated');
        }

        /**
         * Sends a POST request against the `api/schemas` endpoint to check if the model is valid.
         *
         * @param {Model} model The model that should be validated.
         * @returns {Array} Returns an array with validation messages if there are any.
         *
         * @note {warn} Currently only checks
         */

    }, {
        key: 'validateAgainstSchema',
        value: function validateAgainstSchema(model) {
            // eslint-disable-line class-methods-use-this
            if (!(model && model.modelDefinition && model.modelDefinition.name)) {
                return Promise.reject('model.modelDefinition.name can not be found');
            }

            function extractValidationViolations(webmessage) {
                if (webmessage.response && webmessage.response.errorReports) {
                    return webmessage.response.errorReports;
                }
                throw new Error('Response was not a WebMessage with the expected format');
            }

            var url = 'schemas/' + model.modelDefinition.name;

            // TODO: The function getOwnedPropertyJSON should probably not be exposed, perhaps we could have a getJSONForModel(ownedPropertiesOnly=true) method.
            return _Api2.default.getApi().post(url, (0, _json.getOwnedPropertyJSON)(model)).catch(function (e) {
                return Promise.reject(e);
            }).then(function (webMessage) {
                if (webMessage.status === 'OK') {
                    return [];
                }
                return Promise.reject(webMessage);
            }).catch(extractValidationViolations);
        }

        /**
         * Returns the `ModelValidation` singleton. Creates a new one if it does not yet exist.
         * Grabs a logger instance by calling `Logger.getLogger`
         *
         * @returns {ModelValidation} New or memoized instance of `ModelInstance`
         */

    }], [{
        key: 'getModelValidation',
        value: function getModelValidation() {
            if (this.modelValidation) {
                return this.modelValidation;
            }
            return this.modelValidation = new ModelValidation(_Logger2.default.getLogger(console));
        }
    }]);

    return ModelValidation;
}();

exports.default = ModelValidation;
//# sourceMappingURL=ModelValidation.js.map