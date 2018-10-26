'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fieldsForSchemas = exports.defaultValues = undefined;
exports.getDefaultValuesForModelType = getDefaultValuesForModelType;

var _organisationUnitGroupSet = require('./model-defaults/organisationUnitGroupSet');

var _organisationUnitGroupSet2 = _interopRequireDefault(_organisationUnitGroupSet);

var _category = require('./model-defaults/category');

var _category2 = _interopRequireDefault(_category);

var _categoryOptionGroupSet = require('./model-defaults/categoryOptionGroupSet');

var _categoryOptionGroupSet2 = _interopRequireDefault(_categoryOptionGroupSet);

var _dataElement = require('./model-defaults/dataElement');

var _dataElement2 = _interopRequireDefault(_dataElement);

var _dataElementGroupSet = require('./model-defaults/dataElementGroupSet');

var _dataElementGroupSet2 = _interopRequireDefault(_dataElementGroupSet);

var _dataSet = require('./model-defaults/dataSet');

var _dataSet2 = _interopRequireDefault(_dataSet);

var _externalMapLayer = require('./model-defaults/externalMapLayer');

var _externalMapLayer2 = _interopRequireDefault(_externalMapLayer);

var _validationNotificationTemplate = require('./model-defaults/validationNotificationTemplate');

var _validationNotificationTemplate2 = _interopRequireDefault(_validationNotificationTemplate);

var _validationRule = require('./model-defaults/validationRule');

var _validationRule2 = _interopRequireDefault(_validationRule);

var _program = require('./model-defaults/program');

var _program2 = _interopRequireDefault(_program);

var _programNotificationTemplate = require('./model-defaults/programNotificationTemplate');

var _programNotificationTemplate2 = _interopRequireDefault(_programNotificationTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultValues = exports.defaultValues = new Map([['organisationUnitGroupSet', _organisationUnitGroupSet2.default], ['category', _category2.default], ['categoryOptionGroupSet', _categoryOptionGroupSet2.default], ['dataElement', _dataElement2.default], ['dataElementGroupSet', _dataElementGroupSet2.default], ['dataSet', _dataSet2.default], ['externalMapLayer', _externalMapLayer2.default], ['validationNotificationTemplate', _validationNotificationTemplate2.default], ['validationRule', _validationRule2.default], ['program', _program2.default], ['programNotificationTemplate', _programNotificationTemplate2.default]]);

function getDefaultValuesForModelType(modelDefinitionName) {
    if (defaultValues.has(modelDefinitionName)) {
        return defaultValues.get(modelDefinitionName);
    }
    return {};
}

var schemaFields = ['apiEndpoint', 'name', 'displayName', 'authorities', 'singular', 'plural', 'shareable', 'metadata', 'klass', 'identifiableObject', 'translatable'];

var schemaPropertyFields = ['href', 'writable', 'collection', 'collectionName', 'name', 'propertyType', 'persisted', 'required', 'min', 'max', 'ordered', 'unique', 'constants', 'owner', 'itemPropertyType', 'translationKey', 'embeddedObject'];

var fieldsForSchemas = exports.fieldsForSchemas = schemaFields.concat('properties[' + schemaPropertyFields.join(',') + ']').join(',');
//# sourceMappingURL=index.js.map