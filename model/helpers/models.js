'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pickOwnerFromModelValidation = exports.pickEmbeddedObjectFromModelValidation = exports.pickTypeFromModelValidation = undefined;
exports.hasModelValidationForProperty = hasModelValidationForProperty;
exports.updateModelFromResponseStatus = updateModelFromResponseStatus;

var _uid = require('../../uid');

var _check = require('../../lib/check');

var _utils = require('../../lib/utils');

var hasPropertyOnModelValidation = function hasPropertyOnModelValidation(property, model) {
    return Boolean((0, _utils.pick)('modelDefinition.modelValidations.' + property)(model));
};

function hasModelValidationForProperty(model, property) {
    return Boolean(hasPropertyOnModelValidation(property, model) && (0, _check.hasOwnProperty)(model.modelDefinition.modelValidations, property));
}

var pickHttpStatus = (0, _utils.pick)('httpStatus');
var pickResponseUid = (0, _utils.pick)('response.uid');
var getModelValidationForProperty = function getModelValidationForProperty(propertyName) {
    return (0, _utils.pick)('modelDefinition.modelValidations.' + propertyName);
};
var pickType = (0, _utils.pick)('type');
var pickEmbeddedObject = (0, _utils.pick)('embeddedObject');
var pickOwner = (0, _utils.pick)('owner');

var pickTypeFromModelValidation = exports.pickTypeFromModelValidation = function pickTypeFromModelValidation(property, model) {
    return pickType(getModelValidationForProperty(property)(model));
};
var pickEmbeddedObjectFromModelValidation = exports.pickEmbeddedObjectFromModelValidation = function pickEmbeddedObjectFromModelValidation(property, model) {
    return pickEmbeddedObject(getModelValidationForProperty(property)(model));
};

var pickOwnerFromModelValidation = exports.pickOwnerFromModelValidation = function pickOwnerFromModelValidation(property, model) {
    return pickOwner(getModelValidationForProperty(property)(model));
};

// This function is called with `.call` with the Model as it's `this`
function updateModelFromResponseStatus(result) {
    var responseUid = pickResponseUid(result);

    // Set the id and href of the newly created object if we got an id in the response
    if (pickHttpStatus(result) === 'Created' && (0, _uid.isValidUid)(responseUid)) {
        this.dataValues.id = responseUid;
        this.dataValues.href = [this.modelDefinition.apiEndpoint, this.dataValues.id].join('/');
    }

    // Object is saved to the api, so it's now clean
    this.resetDirtyState();

    return result;
}
//# sourceMappingURL=models.js.map